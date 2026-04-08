import './Writing.css';
import {
  whenAI, perceptual, crisi, drammi, futuro, spettacolo,
  illusione, architetture, sogno, sinestesia, fascino, teatro,
} from '../assets/images';

const articles = [
  { title: 'When an AI seems to feel, what does it reveal about us?',            date: '26 Mar 2026', tags: ['AI', 'Empathy', 'Perception'],          image: whenAI        },
  { title: 'Perceptual Freedom: Art as a Practice of Meaning-Making',             date: '13 Feb 2026', tags: ['Perception', 'Cognition', 'Art'],        image: perceptual    },
  { title: 'La crisi di identità non è un caso: abbiamo perso il mistero',        date: '4 Dec 2025',  tags: ['Identity', 'Ritual', 'Sacred'],          image: crisi         },
  { title: 'Drammi invisibili: la drammaturgia sensoriale nella vita quotidiana', date: '21 Sep 2025', tags: ['Sensory', 'Dramaturgy', 'Presence'],     image: drammi        },
  { title: 'Il futuro dello spettatore: dalla passività alla co-creazione',       date: '5 Sep 2025',  tags: ['Audience', 'Co-creation', 'Immersive'],  image: futuro        },
  { title: 'Lo spettacolo siamo noi: dal rito sacro alla manipolazione',          date: '3 Sep 2025',  tags: ['Society', 'Media', 'Theatre'],           image: spettacolo    },
  { title: "L'illusione necessaria: perché amiamo l'arte?",                       date: '25 Aug 2025', tags: ['Perception', 'Neuroscience', 'Art'],     image: illusione     },
  { title: "Architetture dell'immaginario: costruire spazi impossibili",           date: '18 Aug 2025', tags: ['Immersive', 'Space', 'Perception'],      image: architetture  },
  { title: 'Sogno come tecnologia artistica: la realtà più reale',                date: '12 Aug 2025', tags: ['Dream', 'Reality', 'Immersive'],         image: sogno         },
  { title: 'Sinestesia e arte: ascoltare i colori, toccare i suoni',              date: '4 Aug 2025',  tags: ['Synaesthesia', 'Aesthetics', 'Senses'],  image: sinestesia    },
  { title: "Il fascino macabro dell'immaginazione: un'analisi del nostro tempo",  date: '28 Jul 2025', tags: ['Post-Horror', 'Aesthetics', 'Culture'],  image: fascino       },
  { title: "Teatro Immersivo: La fine del palcoscenico, l'inizio del mondo",      date: '23 Jul 2025', tags: ['Theatre', 'Performance', 'Research'],    image: teatro        },
];

export function Writing() {
  return (
    <section className="writing" id="writing">
      <div className="writing__container">
        <div className="writing__header">
          <span className="writing__label" data-animate="fade-up">
            Essays &amp; Reflections
          </span>
          <h2
            className="writing__heading"
            data-animate="fade-up"
            style={{ '--delay': '0.1s' } as React.CSSProperties}
          >
            Writing
          </h2>
        </div>

        <div className="writing__grid">
          {articles.map((a, i) => (
            <article
              key={i}
              className="article-card"
              data-animate="fade-up"
              style={{ '--delay': `${(i % 3) * 0.08}s` } as React.CSSProperties}
            >
              <div className="article-card__image-wrap">
                <img
                  src={a.image}
                  alt={a.title}
                  className="article-card__image"
                  loading="lazy"
                />
              </div>
              <div className="article-card__body">
                <time className="article-card__date">{a.date}</time>
                <h3 className="article-card__title">{a.title}</h3>
                <div className="article-card__tags">
                  {a.tags.map(t => (
                    <span key={t} className="article-card__tag">{t}</span>
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
