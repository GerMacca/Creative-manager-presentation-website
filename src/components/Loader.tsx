import { useEffect, useState } from 'react';
import './Loader.css';
import faviconUrl from '../assets/favicon.svg';

interface Props {
  onDone: () => void;
}

const NAME_CHARS = 'Artur Maccagnan'.split('');

export function Loader({ onDone }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const tExit = setTimeout(() => {
      setExiting(true);
      onDone();
    }, 3000);

    return () => clearTimeout(tExit);
  }, [onDone]);

  return (
    <div className={`loader${exiting ? ' loader--exit' : ''}`}>
      <div className="loader__glow loader__glow--1" />
      <div className="loader__glow loader__glow--2" />

      <div className="loader__inner">
        <img src={faviconUrl} alt="" className="loader__logo" />

        <div className="loader__line" />

        <p className="loader__name">
          {NAME_CHARS.map((char, i) => (
            <span
              key={i}
              className="loader__letter"
              style={{ '--i': i } as React.CSSProperties}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
