import Button from './ui/Button';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const badgeColors = [
    'neo-badge--green',
    'neo-badge--pink',
    'neo-badge--orange',
    'neo-badge--blue',
    'neo-badge--purple',
    'neo-badge--cyan',
    'neo-badge--main',
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-container">
          <img
            src={project.image}
            alt={project.title}
            className="modal-image"
          />
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-tech-stack">
            {project.techStack.map((tech, i) => (
              <span key={i} className={`neo-badge ${badgeColors[i % badgeColors.length]}`}>
                {tech}
              </span>
            ))}
          </div>
          <div className="modal-description">
            <h4>Details</h4>
            <ul>
              {project.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="modal-links">
            <Button
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="purple"
            >
              ⭐ GitHub Repo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
