import './Hero.css';
import faviconUrl from '../assets/favicon.svg';

const WORDS = ['ARTUR', 'MACCAGNAN'];

const WORD_DATA = (() => {
  let idx = 0;
  return WORDS.map(word => ({
    word,
    chars: word.split('').map(char => ({ char, i: idx++ })),
  }));
})();

const tags = [
  'Immersive Storytelling',
  'Sensory Dramaturgy',
  'Creative Direction',
  'Cultural Production',
];

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__noise" />
        <img src={faviconUrl} alt="" className="hero__watermark" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__label">
          <span className="hero__label-line" />
          Florence, Italy
        </div>

        <h1 className="hero__name">
          {WORD_DATA.map(({ word, chars }) => (
            <span key={word} className="hero__word">
              {chars.map(({ char, i }) => (
                <span
                  key={i}
                  className="hero__letter"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="hero__divider" />

        <p className="hero__subtitle">Showman &amp; Creative Manager</p>

        <div className="hero__tags">
          {tags.map(t => (
            <span key={t} className="hero__tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
