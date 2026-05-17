import { useState } from 'react';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import ProjectModal from '../components/ProjectModal';
import Button from '../components/ui/Button';
import { usePortfolio } from '../context/PortfolioContext';

export default function Portfolio() {
  const { profile, experience, education, skills, languages, projects, certificates } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  const badgeColors = [
    'neo-badge--green', 'neo-badge--pink', 'neo-badge--orange',
    'neo-badge--blue', 'neo-badge--purple', 'neo-badge--cyan',
    'neo-badge--main', 'neo-badge--red',
  ];

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-role">{profile.role}</div>
            <h1>{profile.name}</h1>
            <p>{profile.summary}</p>
            <div className="hero-btns">
              <Button as="a" href={profile.linkedin} target="_blank" rel="noopener noreferrer" variant="yellow">💼 LinkedIn</Button>
              <Button as="a" href={profile.github} target="_blank" rel="noopener noreferrer" variant="purple">⭐ GitHub</Button>
              <Button as="a" href={`mailto:${profile.email}`} variant="green">✉️ Email</Button>
            </div>
            <div className="hero-contact-bar">
              <span className="hero-contact-item">📞 {profile.phone}</span>
              <span className="hero-contact-item">📍 {profile.location}</span>
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-wrapper">
              <img src={profile.photo} alt={profile.name} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERESTS ===== */}
      <section className="section" id="interests">
        <h2 className="section-title"><span className="icon">🎯</span> Fields of Interest</h2>
        <div className="interests-grid">
          {profile.interests.map((item, i) => (
            <div key={i} className="interest-item" style={{ background: ['var(--cyan)', 'var(--yellow)', 'var(--main)', 'var(--pink)'][i % 4] }}>
              <div className="interest-icon">{item.icon}</div>
              <div className="interest-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Marquee />

      {/* ===== EXPERIENCE ===== */}
      <section className="section" id="experience">
        <h2 className="section-title"><span className="icon">💼</span> Work Experience</h2>
        {experience.map((exp, i) => (
          <div key={i} className="experience-card">
            <div className="experience-header">
              <div>
                <div className="experience-title">{exp.title}</div>
                {exp.techStack && (
                  <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.techStack.split(', ').map((t, j) => (
                      <span key={j} className={`neo-badge ${badgeColors[j % badgeColors.length]}`}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="experience-period">{exp.period}</span>
            </div>
            {exp.location && <div className="experience-location">📍 {exp.location}</div>}
            {exp.team && <div className="experience-location">👥 {exp.team}</div>}
            <ul className="experience-list">
              {exp.points.map((point, j) => <li key={j}>{point}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="section" id="education">
        <h2 className="section-title"><span className="icon">🎓</span> Education</h2>
        <div className="education-grid">
          {education.map((edu, i) => (
            <div key={i} className="education-card">
              <div className="education-school">{edu.school}</div>
              <span className="education-year">{edu.period}</span>
              <ul className="education-details">
                {edu.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
              {edu.focus && <div className="education-focus">🎯 Focus: {edu.focus}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CERTIFICATES ===== */}
      {certificates.length > 0 && (
        <section className="section" id="certificates">
          <h2 className="section-title"><span className="icon">📜</span> Certificates</h2>
          <div className="projects-grid">
            {certificates.map((cert, i) => (
              <div key={i} className="neo-card" style={{ overflow: 'hidden', padding: 0 }}>
                {cert.image && <img src={cert.image} alt={cert.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderBottom: '3px solid #000', display: 'block' }} />}
                <div style={{ padding: 20 }}>
                  <div className="project-title">{cert.title}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 6, fontWeight: 700 }}>{cert.issuer} • {cert.date}</div>
                  {cert.description && <div style={{ fontSize: 13, color: '#333' }}>{cert.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== SKILLS ===== */}
      <section className="section" id="skills">
        <h2 className="section-title"><span className="icon">⚡</span> Skills</h2>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div key={i} className="skill-category">
              <div className="skill-category-title">{cat.category}</div>
              <div className="skill-tags">
                {cat.items.map((skill, j) => <span key={j} className="skill-tag">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Marquee />

      {/* ===== PROJECTS ===== */}
      <section className="section" id="projects">
        <h2 className="section-title"><span className="icon">🚀</span> Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-info">
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.shortDesc}</div>
                <div className="project-tech">
                  {project.techStack.map((tech, j) => (
                    <span key={j} className={`neo-badge ${badgeColors[j % badgeColors.length]}`} style={{ fontSize: 11 }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LANGUAGES ===== */}
      <section className="section" id="languages">
        <h2 className="section-title"><span className="icon">🌐</span> Languages</h2>
        <div className="languages-grid">
          {languages.map((lang, i) => (
            <div key={i} className="language-card">
              <div className="language-name">{lang.name}</div>
              <span className="language-level" style={{ background: lang.color }}>{lang.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Button as="a" href={profile.linkedin} target="_blank" rel="noopener noreferrer" variant="dark" size="sm" style={{ border: '2px solid #fff' }}>LinkedIn</Button>
            <Button as="a" href={profile.github} target="_blank" rel="noopener noreferrer" variant="dark" size="sm" style={{ border: '2px solid #fff' }}>GitHub</Button>
            <Button as="a" href={`mailto:${profile.email}`} variant="dark" size="sm" style={{ border: '2px solid #fff' }}>Email</Button>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} {profile.name}. Built with ❤️ and Neobrutalism.</p>
        </div>
      </footer>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}
