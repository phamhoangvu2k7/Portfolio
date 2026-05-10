import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground: React.FC = () => {
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!threeCanvasRef.current || !webglCanvasRef.current) return;

    // ----- SHARED STATE -----
    let rotQ = new THREE.Quaternion();
    let zoom = 10.0;
    let t = 0;
    let introProgress = 0;
    
    // Smoothstep utility
    const smoothstep = (x: number) => {
      x = Math.max(0, Math.min(1, x));
      return x * x * (3 - 2 * x);
    };

    // ==========================================
    // 1. ENDSKY (FRAGMENT SHADER) SETUP
    // ==========================================
    const gl = webglCanvasRef.current.getContext('webgl');
    let endskyProg: WebGLProgram | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uResolutionLoc: WebGLUniformLocation | null = null;
    let uRotLoc: WebGLUniformLocation | null = null;
    let uZoomLoc: WebGLUniformLocation | null = null;

    if (gl) {
      const vs = `
        attribute vec2 aPos;
        void main() {
            gl_Position = vec4(aPos, 0.0, 1.0);
        }
      `;
      const fs = `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform mat3 uRot;
        uniform float uZoom;

        #define TAU 6.28318530718

        float Lift(float x, float amount) {
            return (1.0 + amount) * x / (amount * x + 1.0);
        }

        mat2 Rotate(float angle) {
            float s = sin(angle), c = cos(angle);
            return mat2(c, -s, s, c);
        }

        vec3 GetEndSkyColor(vec3 viewDir) {
            vec2 coord = viewDir.xz / (1.0 + abs(viewDir.y)) * 80.0;
            vec3 pattern = vec3(0.0);
            float amplitude = 1.0;
            float frequency = 1.0;
            for (int i = 0; i < 16; i++) {
                vec2 direction = vec2(0.707106782) * Rotate(float(i) * 4.3333);
                float k = TAU / (20.0 / frequency);
                float a = amplitude / k;
                vec2 dir = direction;
                float f = k * (dot(dir, coord.xy) - Lift(k, 1.6) * uTime * 0.31321);
                vec3 layer;
                layer.xz = dir.xy * (a * cos(f)) / a;
                layer.y = sin(f);
                pattern += layer.y * 0.5 + 0.5;
                coord -= layer.xz * 0.36;
                amplitude *= 0.99;
                frequency *= 1.2;
            }
            pattern = clamp(pattern * 0.05, 0.0, 1.0);
            pattern = pattern * pattern * exp((pow(max(1.3 * pattern - 0.3, 0.0), vec3(2.0)) - 1.0) * (1.0 - vec3(0.7686, 0.6275, 1.0) * 0.5) * 13.0) * 60.0;
            return pattern;
        }

        vec3 LinearTosRGB(vec3 x) {
            vec3 sRGBLo = x * 12.92;
            vec3 sRGBHi = pow(abs(x), vec3(1.0 / 2.4)) * 1.055 - 0.055;
            return mix(sRGBHi, sRGBLo, step(x, vec3(0.0031308)));
        }

        vec3 TechTonemap(vec3 color) {
            vec3 a = color * min(vec3(1.0), 1.0 - exp(-1.0 / 0.038 * color));
            a = mix(a, color, color * color);
            return a / (a + 0.6);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution * 2.0 - 1.0;
            uv.x *= uResolution.x / uResolution.y;
            uv *= uZoom;
            vec3 viewDir = normalize(uRot * vec3(uv, 1.0));
            vec3 color = GetEndSkyColor(viewDir);
            color = TechTonemap(color * 0.85);
            color = LinearTosRGB(color);
            gl_FragColor = vec4(color, 1.0);
        }
      `;

      const createShader = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      endskyProg = gl.createProgram()!;
      gl.attachShader(endskyProg, createShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(endskyProg, createShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(endskyProg);
      gl.useProgram(endskyProg);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(endskyProg, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      uTimeLoc = gl.getUniformLocation(endskyProg, 'uTime');
      uResolutionLoc = gl.getUniformLocation(endskyProg, 'uResolution');
      uRotLoc = gl.getUniformLocation(endskyProg, 'uRot');
      uZoomLoc = gl.getUniformLocation(endskyProg, 'uZoom');
    }

    let endskyCurrentQ = { x: 0, y: 0, z: 0, w: 1 };
    
    function quatToBasis(q: any) {
        const xx = q.x * q.x, yy = q.y * q.y, zz = q.z * q.z;
        const xy = q.x * q.y, xz = q.x * q.z, yz = q.y * q.z;
        const xw = q.x * q.w, yw = q.y * q.w, zw = q.z * q.w;
        return {
            rx: 1 - 2 * (yy + zz), ry: 2 * (xy + zw), rz: 2 * (xz - yw),
            ux: 2 * (xy - zw), uy: 1 - 2 * (xx + zz), uz: 2 * (yz + xw),
            fx: 2 * (xz + yw), fy: 2 * (yz - xw), fz: 1 - 2 * (xx + yy)
        };
    }

    // ==========================================
    // 2. THREE.JS (3D GALAXY) SETUP
    // ==========================================
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvasRef.current, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false; 
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const cameraX = window.innerWidth <= 768 ? 0 : -3.0;
    camera.position.set(cameraX, 2, 18);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    scene.add(new THREE.AmbientLight(0x150b24, 0.6));
    const dirLight = new THREE.DirectionalLight(0xdab3ff, 2.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);
    coreGroup.rotation.x = 0.15;
    coreGroup.rotation.y = -0.25;

    const CORE_RADIUS = 1.4;
    const coreGeo = new THREE.IcosahedronGeometry(CORE_RADIUS, 3);
    const basePos = new Float32Array(coreGeo.attributes.position.array);
    const N = basePos.length / 3;
    const thetaArr = new Float32Array(N);
    const phiArr = new Float32Array(N);
    const randoms = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const x = basePos[i*3] / CORE_RADIUS, y = basePos[i*3+1] / CORE_RADIUS, z = basePos[i*3+2] / CORE_RADIUS;
      thetaArr[i] = Math.atan2(y, x);
      phiArr[i] = Math.acos(Math.max(-1, Math.min(1, z)));
      randoms[i] = Math.random();
    }
    coreGeo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    function getGlowTex(color = 'rgba(170,0,255,1)', r = 64) {
      const c = document.createElement('canvas'); c.width = c.height = r * 2;
      const ctx = c.getContext('2d');
      if (ctx) {
        const g = ctx.createRadialGradient(r, r, 0, r, r, r);
        g.addColorStop(0, color); g.addColorStop(0.2, color); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, r * 2, r * 2);
      }
      return new THREE.CanvasTexture(c);
    }

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xaa00ff, emissive: 0x4400aa, emissiveIntensity: 1.0,
      wireframe: true, transparent: true, opacity: 0.25,
      blending: THREE.AdditiveBlending, depthWrite: false
    });

    const coreMeshWire = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMeshWire);
    
    const coreUserData = { smoothM: 0, targetM: 0, nextPickTime: 0 };

    const bhGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(bhGeo, bhMat);
    coreGroup.add(blackHole);

    const glowOrb = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getGlowTex('rgba(180,50,255,0.8)', 64),
      blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    }));
    glowOrb.scale.setScalar(6.5);
    coreGroup.add(glowOrb);

    function createFragmentedRing(innerR: number, outerR: number, depth: number, fragmentsCount: number, rotSpeed: number, axis: THREE.Vector3) {
      const group = new THREE.Group();
      const stoneMat = new THREE.MeshPhysicalMaterial({
        color: 0x1a0b3a, emissive: 0x110522, emissiveIntensity: 0.4,
        metalness: 0.9, roughness: 0.1, clearcoat: 1.0, flatShading: true
      });
      const gap = 0.3;
      const totalArc = Math.PI * 2;
      const arcLength = (totalArc / fragmentsCount) - gap;

      for (let i = 0; i < fragmentsCount; i++) {
        if (Math.random() < 0.3) continue;
        const start = i * (totalArc / fragmentsCount);
        const shape = new THREE.Shape();
        shape.absarc(0, 0, outerR, start, start + arcLength, false);
        shape.lineTo(Math.cos(start + arcLength) * innerR, Math.sin(start + arcLength) * innerR);
        shape.absarc(0, 0, innerR, start + arcLength, start, true);
        shape.lineTo(Math.cos(start) * outerR, Math.sin(start) * outerR);
        const extrudeSettings = {
          depth: depth, bevelEnabled: true, bevelSegments: 1,
          steps: 1, bevelSize: 0.05, bevelThickness: 0.05, curveSegments: 12
        };
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geo.translate(0, 0, -depth / 2);
        const mesh = new THREE.Mesh(geo, stoneMat);
        group.add(mesh);
      }
      return { obj: group, axis: axis.normalize(), speed: rotSpeed };
    }

    const rings = [
      createFragmentedRing(3.0, 3.6, 0.6, 3, 0.007, new THREE.Vector3(1, 0.5, 0.2)),
      createFragmentedRing(4.2, 5.0, 0.8, 4, -0.004, new THREE.Vector3(-0.5, 1, 0.5)),
      createFragmentedRing(5.6, 6.6, 1.2, 5, 0.003, new THREE.Vector3(0.2, -0.5, 1)),
    ];
    rings.forEach(r => mainGroup.add(r.obj));

    const pCount = window.innerWidth <= 768 ? 1000 : 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2.0 + Math.pow(Math.random(), 1.5) * 20.0;
      const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
      pPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i*3+2] = r * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08, map: getGlowTex('rgba(190,100,255,1)', 16),
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    // ==========================================
    // 3. ANIMATION LOOP
    // ==========================================
    let threeRafId: number;
    const _q = new THREE.Quaternion();

    function animate() {
      t += 0.01;
      introProgress = Math.min(1, introProgress + 0.004);

      // Auto-rotation only
      _q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.001); 
      rotQ.premultiply(_q);
      rotQ.normalize();
      mainGroup.quaternion.copy(rotQ);

      camera.position.z += (zoom - camera.position.z) * 0.05;
      const currentZf = Math.max(0, Math.min(1, (35 - camera.position.z) / 27));
      camera.position.y = 2.0 - currentZf * 2.0;

      const ringIntro = smoothstep(Math.min(1, introProgress / 0.75));
      const coreIntro = smoothstep(Math.max(0, (introProgress - 0.7) / 0.3));
      
      if (!coreUserData.nextPickTime || t > coreUserData.nextPickTime) {
        coreUserData.targetM = Math.floor(Math.random() * 4);
        coreUserData.nextPickTime = t + 5 + Math.random() * 5;
      }
      coreUserData.smoothM += (coreUserData.targetM - coreUserData.smoothM) * 0.04;
      const morphCycle = coreUserData.smoothM;

      const positions = coreGeo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const idx = i * 3, bx = basePos[idx], by = basePos[idx+1], bz = basePos[idx+2];
        const theta = thetaArr[i], phi = phiArr[i];
        const tectonic = Math.sin(6 * theta) * Math.cos(6 * phi);
        const r1 = 1.0 + (tectonic > 0.3 ? 0.15 : (tectonic < -0.3 ? -0.1 : 0));
        const tx1 = bx * r1, ty1 = by * r1, tz1 = bz * r1;
        const r2 = 1.0 + 0.25 * Math.sin(3 * theta - t * 1.5) + 0.2 * Math.cos(4 * phi + t);
        const tx2 = bx * r2, ty2 = by * r2, tz2 = bz * r2;
        const r3 = 1.0 + 0.12 * Math.sin(8 * theta + t * 2) * Math.cos(t * 1.2) + 0.05 * Math.sin(phi * 6);
        const tx3 = bx * r3, ty3 = by * r3, tz3 = bz * r3;
        
        let tx, ty, tz;
        if (morphCycle < 1) {
          const lerp = smoothstep(morphCycle);
          tx = bx + (tx1 - bx) * lerp; ty = by + (ty1 - by) * lerp; tz = bz + (tz1 - bz) * lerp;
        } else if (morphCycle < 2) {
          const lerp = smoothstep(morphCycle - 1);
          tx = tx1 + (tx2 - tx1) * lerp; ty = ty1 + (ty2 - ty1) * lerp; tz = tz1 + (tz2 - tz1) * lerp;
        } else if (morphCycle < 3) {
          const lerp = smoothstep(morphCycle - 2);
          tx = tx2 + (tx3 - tx2) * lerp; ty = ty2 + (ty3 - ty2) * lerp; tz = tz2 + (tz3 - tz2) * lerp;
        } else {
          const lerp = smoothstep(morphCycle - 3);
          tx = tx3 + (bx - tx3) * lerp; ty = ty3 + (by - ty3) * lerp; tz = tz3 + (bz - tz3) * lerp;
        }
        positions[idx]   = bx + (tx - bx) * coreIntro;
        positions[idx+1] = by + (ty - by) * coreIntro;
        positions[idx+2] = bz + (tz - bz) * coreIntro;
      }
      coreGeo.attributes.position.needsUpdate = true;
      coreGeo.computeVertexNormals();

      const zf = Math.max(0, Math.min(1, (35 - zoom) / 27));
      const coreRotSpeed = 0.01 * (0.1 + 0.3 * coreIntro) * (1 + zf * 2.0);
      coreGroup.rotation.y += coreRotSpeed;
      coreGroup.rotation.z = Math.sin(t * 0.5) * 0.2 * coreIntro;
      coreGroup.scale.setScalar((1 + zf * 0.2) * (0.25 + 0.75 * ringIntro));

      glowOrb.scale.setScalar((6.5 + Math.sin(t * 3) * 0.8) * (0.2 + 0.8 * coreIntro));

      rings.forEach((r, i) => {
        const ringSpeed = r.speed * (1 + zf * 3.0) * (0.2 + 0.8 * ringIntro);
        r.obj.rotateOnAxis(r.axis, ringSpeed);
        r.obj.scale.setScalar((1 + zf * (0.15 + i * 0.08)) * ringIntro);
      });

      pSystem.rotation.y = t * 0.02;
      pSystem.material.opacity = 0.4 + Math.sin(t * 4) * 0.2;

      renderer.render(scene, camera);

      if (gl && endskyProg) {
        endskyCurrentQ.x = rotQ.x;
        endskyCurrentQ.y = rotQ.y;
        endskyCurrentQ.z = rotQ.z;
        endskyCurrentQ.w = rotQ.w;

        const b = quatToBasis(endskyCurrentQ);
        gl.uniform1f(uTimeLoc, performance.now() * 0.001);
        gl.uniform2f(uResolutionLoc, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(uZoomLoc, 1.0 + (zoom - 10) * 0.005);
        gl.uniformMatrix3fv(uRotLoc, false, new Float32Array([
            b.rx, b.ry, b.rz,
            b.ux, b.uy, b.uz,
            b.fx, b.fy, b.fz
        ]));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      threeRafId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      const cameraX = window.innerWidth <= 768 ? 0 : -3.0;
      camera.position.x = cameraX;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (webglCanvasRef.current) {
        webglCanvasRef.current.width = window.innerWidth;
        webglCanvasRef.current.height = window.innerHeight;
        gl?.viewport(0, 0, window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(threeRafId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#000' }}>
      <canvas ref={webglCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      <canvas ref={threeCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
};

export default SpaceBackground;
