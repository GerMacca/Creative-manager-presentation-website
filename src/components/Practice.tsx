import './Practice.css';

const fields = [
  {
    num: '01',
    title: 'Immersive Storytelling & Sensory Dramaturgy',
    desc: 'Crafting multisensory narratives that engage body, mind, and emotion simultaneously — where scent, space, and rhythm become language.',
  },
  {
    num: '02',
    title: 'Concept Development & Creative Direction',
    desc: 'From initial vision to final execution, building coherent aesthetic worlds with strategic and artistic precision.',
  },
  {
    num: '03',
    title: 'Event Organisation & Cultural Production',
    desc: 'Managing the full lifecycle of cultural and artistic events — from booking to audience engagement and operational coordination.',
  },
  {
    num: '04',
    title: 'Cultural Finance, Booking & Collaboration',
    desc: 'Bridging artistic ambition with financial sustainability, strategic partnerships, and institutional collaboration research.',
  },
  {
    num: '05',
    title: 'Business Strategy for Arts & Culture',
    desc: 'Applying analytical frameworks to creative enterprises and cultural institutions without sacrificing artistic integrity.',
  },
  {
    num: '06',
    title: 'Creative Writing',
    desc: 'Dramaturgical texts, sensory writing, and essays on perception, experience, and the poetics of the invisible.',
  },
];

export function Practice() {
  return (
    <section className="practice" id="practice">
      <div className="practice__container">
        <div className="practice__header">
          <span className="practice__label" data-animate="fade-up">
            Fields of Practice
          </span>
          <h2
            className="practice__heading"
            data-animate="fade-up"
            style={{ '--delay': '0.1s' } as React.CSSProperties}
          >
            What I do
          </h2>
        </div>

        <div className="practice__grid">
          {fields.map((f, i) => (
            <div
              key={f.num}
              className="practice__card"
              data-num={f.num}
              data-animate="fade-up"
              style={{ '--delay': `${i * 0.07}s` } as React.CSSProperties}
            >
              <h3 className="practice__card-title">{f.title}</h3>
              <p className="practice__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
