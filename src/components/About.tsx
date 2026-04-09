import './About.css';
import { profile } from '../assets/images';

const languages = [
  { lang: 'Portuguese', level: 'Native',   fill: 100 },
  { lang: 'Italian',    level: 'Advanced',  fill: 86  },
  { lang: 'English',    level: 'Advanced',  fill: 86  },
  { lang: 'German',     level: 'Basic',     fill: 30  },
];

const credentials = [
  {
    label: 'Education',
    value: 'ProGeAS — UNIFI',
    sub: 'Management of Arts & Culture Enterprises',
  },
  {
    label: 'Formation',
    value: 'Master in Event Management',
    sub: 'Up Level – School of Management',
  },
];

export function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">

        {/* ── Left ── */}
        <div>
          <div className="about__image-wrap" data-animate="fade-right">
            <img
              src={profile}
              alt="Artur Maccagnan"
              className="about__image"
            />
            <div className="about__image-border" />
          </div>

          <div
            className="about__credentials"
            data-animate="fade-up"
            style={{ '--delay': '0.15s' } as React.CSSProperties}
          >
            {credentials.map(c => (
              <div key={c.label} className="about__credential">
                <span className="about__credential-label">{c.label}</span>
                <span className="about__credential-value">{c.value}</span>
                <span className="about__credential-sub">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right ── */}
        <div>
          <div data-animate="fade-up">
            <span className="about__section-label">About</span>
            <h2 className="about__heading">
              At the threshold<br />
              <em>of every experience</em>
            </h2>
          </div>

          <div className="about__bio">
            <p
              data-animate="fade-up"
              style={{ '--delay': '0.1s' } as React.CSSProperties}
            >
              I work at the threshold — between the stage and the strategy room,
              between the body of a performer and the mind of a producer. My practice
              moves across cultural management and performing arts, immersive storytelling
              and concept development, the poetry of the senses and the architecture of
              an event.
            </p>
            <p
              data-animate="fade-up"
              style={{ '--delay': '0.18s' } as React.CSSProperties}
            >
              I believe that every experience is a perceptual journey. A well-designed
              moment does not simply communicate — it dissolves the distance between inner
              and outer world, between the expected and the barely imaginable. I work with
              scent, image, rhythm, and space as a dramaturgist works with language:
              precisely, and with full attention to what remains unspoken.
            </p>
            <p
              data-animate="fade-up"
              style={{ '--delay': '0.26s' } as React.CSSProperties}
            >
              The shadow is not something hidden or negative. It is the deepest layer of
              the self — a reservoir of impulses, emotions, and potential that often remains
              unacknowledged until it manifests through the body. My work is an invitation
              to encounter it, without resistance, with curiosity.
            </p>
          </div>

          <div
            className="about__lang-group"
            data-animate="fade-up"
            style={{ '--delay': '0.32s' } as React.CSSProperties}
          >
            <span className="about__lang-label">Languages</span>
            <div className="about__lang-list">
              {languages.map(({ lang, level, fill }) => (
                <div key={lang}>
                  <div className="about__lang-info">
                    <span>{lang}</span>
                    <span className="about__lang-level">{level}</span>
                  </div>
                  <div className="about__lang-bar">
                    <div
                      className="about__lang-fill"
                      style={{ '--fill': `${fill}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
