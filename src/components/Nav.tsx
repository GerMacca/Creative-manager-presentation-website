import { useState, useEffect } from 'react';
import './Nav.css';
import faviconUrl from '../assets/favicon.svg';

const links = [
  { id: 'about', label: 'About' },
  { id: 'practice', label: 'Practice' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

interface Props {
  onLogoClick?: () => void;
  onNavigate?: (id: string) => void;
}

export function Nav({ onLogoClick, onNavigate }: Props = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.35 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 450) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a
        href="#"
        className="nav__logo"
        onClick={onLogoClick ? (e) => { e.preventDefault(); setMenuOpen(false); onLogoClick(); } : undefined}
      >
        <img src={faviconUrl} alt="Artur Maccagnan" className="nav__logo-img" />
      </a>
      <button
        type="button"
        className={`nav__toggle${menuOpen ? ' is-open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="main-navigation-links"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <button
        type="button"
        className={`nav__backdrop${menuOpen ? ' is-open' : ''}`}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <ul id="main-navigation-links" className={`nav__links${menuOpen ? ' is-open' : ''}`}>
        {links.map(l => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={`nav__link${active === l.id ? ' is-active' : ''}`}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(l.id);
                }
                setMenuOpen(false);
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
