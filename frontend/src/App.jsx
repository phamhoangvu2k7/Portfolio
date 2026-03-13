import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Player } from '@lottiefiles/react-lottie-player'

function App() {
  const [projects, setProjects] = useState([])
  const [loadingComplete, setLoadingComplete] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    // Fetch projects from Django API
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        setProjects(response.data)
      })
      .catch(error => {
        console.error("Error fetching projects:", error)
      })
  }, [])

  // Lock scroll on mount
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')

    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  const handleLottieComplete = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('hidden')
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
      setTimeout(() => {
        setLoadingComplete(true)
      }, 1500)
    }
  }

  return (
    <>
      {!loadingComplete && (
        <div id="loading-overlay" ref={overlayRef}>
          <Player
            src="/Hello.json"
            background="transparent"
            speed={1}
            style={{ width: '100vw', height: '100vh' }}
            autoplay
            keepLastFrame // Ensure it doesn't loop
            onEvent={(event) => {
              if (event === 'complete') handleLottieComplete()
            }}
          />
        </div>
      )}

      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting animate-up">👋 Xin chào, tôi là</p>
            <h1 className="name animate-up delay-1">Pham Hoang Vu</h1>
            <h2 className="role animate-up delay-2">&lt; Web Developer /&gt;</h2>
            <p className="description animate-up delay-3">
              Tôi là một lập trình viên đam mê xây dựng các ứng dụng web tối ưu và trải nghiệm người dùng đột phá.
              Nơi tôi biến những ý tưởng phức tạp thành những dòng code hoàn hảo.
            </p>

            <div className="hero-actions animate-up delay-4">
              <a href="#projects" className="btn-primary">
                Xem Dự Án <i className="fas fa-arrow-down" style={{ marginLeft: '8px' }}></i>
              </a>

              <div className="social-links">
                <a href="https://github.com/Tên-Của-Bạn" target="_blank" rel="noreferrer" className="social-icon github" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/Tên-Của-Bạn" target="_blank" rel="noreferrer" className="social-icon linkedin" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="hero-image-col animate-up delay-2">
            <div className="image-wrapper">
              <img src="/avatar.jpg" alt="Phạm Hoàng Vũ" className="avatar-pro" />
              <div className="tech-badge badge-1"><i className="fab fa-python"></i> Python</div>
              <div className="tech-badge badge-2"><i className="fab fa-js"></i> JavaScript</div>
              <div className="tech-badge badge-3"><i className="fab fa-java"></i> Java</div>
            </div>
          </div>
        </div>
      </header>

      <main id="projects" className="projects-section">
        <div className="section-header">
          <h2>Dự Án Nổi Bật</h2>
          <div className="line"></div>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="card-image-wrapper">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="project-image" />
                ) : (
                  <div className="placeholder-image">💻</div>
                )}
                <div className="card-overlay">
                  <a href={project.link} target="_blank" rel="noreferrer" className="btn-view">Xem chi tiết</a>
                </div>
              </div>
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
