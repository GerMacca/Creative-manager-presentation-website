import { useState, useEffect } from 'react';
import './Nav.css';
import faviconUrl from '../assets/favicon.svg';

const links = [
  { id: 'about',    label: 'About'    },
  { id: 'practice', label: 'Practice' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing',  label: 'Writing'  },
  { id: 'contact',  label: 'Contact'  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');

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

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#" className="nav__logo">
        <img src={faviconUrl} alt="Artur Maccagnan" className="nav__logo-img" />
      </a>
      <ul className="nav__links">
        {links.map(l => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={`nav__link${active === l.id ? ' is-active' : ''}`}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
