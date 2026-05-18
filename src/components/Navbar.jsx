import { useState, useEffect } from 'react';
import { FiHome, FiBriefcase, FiBookOpen, FiZap, FiCode, FiGlobe, FiMenu, FiX } from 'react-icons/fi';
import Button from './ui/Button';

const navItems = [
  { label: 'Home', href: '#home', icon: <FiHome size={16} /> },
  { label: 'Experience', href: '#experience', icon: <FiBriefcase size={16} /> },
  { label: 'Education', href: '#education', icon: <FiBookOpen size={16} /> },
  { label: 'Skills', href: '#skills', icon: <FiZap size={16} /> },
  { label: 'Projects', href: '#projects', icon: <FiCode size={16} /> },
  { label: 'Languages', href: '#languages', icon: <FiGlobe size={16} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar-pill" id="navbar">
      <div className="navbar-pill-inner">
        {/* Logo */}
        <a
          href="#home"
          className="navbar-pill-logo"
          onClick={(e) => handleClick(e, '#home')}
        >
          <span className="navbar-pill-logo-icon">JW</span>
          <span className="navbar-pill-logo-text">JUAN WENS</span>
        </a>

        {/* Nav links */}
        <ul className={`navbar-pill-links${isOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`navbar-pill-link${activeSection === item.href.slice(1) ? ' active' : ''}`}
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="navbar-pill-actions">
          <Button
            as="a"
            href="https://github.com/Hyusuka"
            target="_blank"
            rel="noopener noreferrer"
            variant="purple"
            size="sm"
            style={{ borderRadius: '50px' }}
          >
            ⭐ GitHub
          </Button>
          <Button
            as="a"
            href="https://wa.me/6281290320714"
            variant="outline"
            size="sm"
            style={{ borderRadius: '50px' }}
          >
            Contact
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div
          className={`navbar-pill-hamburger${isOpen ? ' open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </div>
      </div>
    </nav>
  );
}
