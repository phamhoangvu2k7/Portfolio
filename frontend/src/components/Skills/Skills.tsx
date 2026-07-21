import SkillCard, { type TechItem } from './SkillCard'
import './Skills.css'

const languagesAndFrameworks: TechItem[] = [
  { label: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { label: 'Java', icon: 'devicon-java-plain colored' },
  { label: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { label: 'Express', icon: 'devicon-express-original' },
  { label: 'Nuxt.js', icon: 'devicon-nuxtjs-plain colored' },
]

const databases: TechItem[] = [
  { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { label: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
]

const devopsAndTools: TechItem[] = [
  { label: 'Docker', icon: 'devicon-docker-plain colored' },
  { label: 'Git', icon: 'devicon-git-plain colored' },
  { label: 'GitHub', icon: 'devicon-github-original' },
  { label: 'Postman', icon: 'devicon-postman-plain colored' },
  { label: 'Cloudflare', icon: 'devicon-cloudflare-plain colored' },
]

export default function Skills() {
  return (
    <section id="skills" className="skills-section" aria-label="Skills and Technologies">
      <div className="section-header">
        <h2>Skills & Tech Stack</h2>
        <p>Languages, frameworks, and tooling I utilize across projects</p>
      </div>

      <div className="skills-wrapper">
        <div>
          <h3 className="skills-group-title">Languages & Frameworks</h3>
          <div className="skills-grid">
            {languagesAndFrameworks.map((tech, i) => (
              <SkillCard key={tech.label} tech={tech} index={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="skills-group-title">Databases</h3>
          <div className="skills-grid">
            {databases.map((tech, i) => (
              <SkillCard key={tech.label} tech={tech} index={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="skills-group-title">DevOps & Tools</h3>
          <div className="skills-grid">
            {devopsAndTools.map((tech, i) => (
              <SkillCard key={tech.label} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
