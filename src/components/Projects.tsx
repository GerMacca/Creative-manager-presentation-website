import './Projects.css';
import { sogno, fascino, architetture } from '../assets/images';

const projects = [
  {
    num: '01',
    title: 'Shadow Jazz',
    subtitle: 'Dramaturgical Fragment',
    org: 'Shadow Party Universe',
    role: 'Concept & Dramaturgical Writing',
    desc: 'A dramaturgical fragment functioning as sensory writing and world-building, exploring synesthetic language, atmosphere, and inner landscapes. Dark purples, petrol blues, and scents — cardamom, thyme, whiskey, berries — become narrative agents.',
    image: sogno,
    tags: ['Concept', 'Dramaturgy', 'Sensory Writing'],
  },
  {
    num: '02',
    title: 'Swing Circus Festival',
    subtitle: 'Producer Assistant',
    org: 'Sweet Life Factory',
    role: '2024 – Present',
    desc: "Production and organisational support for one of Italy's most distinctive circus and performing arts festivals. Spanning artistic booking, social media communications, content creation, event photography, and audience engagement.",
    image: fascino,
    tags: ['Production', 'Festival', 'Event Management'],
  },
  {
    num: '03',
    title: 'Narrative Cocktails',
    subtitle: 'Sensory Bar Experience',
    org: 'Angel Rooftop — Calimala Hotel',
    role: 'Florence, 2023 – Present',
    desc: "Sensory experience design through narrative cocktails. Bar management, team coordination, staff training, and guest experience curation at one of Florence's most distinctive hospitality venues.",
    image: architetture,
    tags: ['Experience Design', 'Hospitality', 'Sensory'],
  },
];

export function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects__container">
        <div className="projects__header">
          <span className="projects__label" data-animate="fade-up">
            Selected Work
          </span>
          <h2
            className="projects__heading"
            data-animate="fade-up"
            style={{ '--delay': '0.1s' } as React.CSSProperties}
          >
            Projects
          </h2>
        </div>

        <div className="projects__list">
          {projects.map((p, i) => (
            <article
              key={p.num}
              className={`project${i % 2 === 1 ? ' project--reverse' : ''}`}
              data-animate="fade-up"
              style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className="project__image-wrap">
                <img
                  src={p.image}
                  alt={p.title}
                  className="project__image"
                  loading="lazy"
                />
                <div className="project__image-overlay" />
              </div>

              <div className="project__content">
                <div className="project__meta">
                  <span className="project__num">{p.num}</span>
                  <span className="project__org">{p.org}</span>
                </div>
                <h3 className="project__title">{p.title}</h3>
                <p className="project__subtitle">
                  {p.subtitle} — {p.role}
                </p>
                <p className="project__desc">{p.desc}</p>
                <div className="project__tags">
                  {p.tags.map(t => (
                    <span key={t} className="project__tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
