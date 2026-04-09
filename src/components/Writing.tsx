import './Writing.css';
import { articles } from '../data/articles';
import { estimateReadTimeMinutes } from '../utils/readTime';

interface Props {
  onArticleClick: (slug: string) => void;
}

export function Writing({ onArticleClick }: Props) {
  const readTimesBySlug = Object.fromEntries(
    articles.map(article => [article.slug, estimateReadTimeMinutes(article.body())])
  );

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
              key={a.slug}
              className="article-card"
              data-animate="fade-up"
              style={{ '--delay': `${(i % 3) * 0.08}s` } as React.CSSProperties}
              onClick={() => onArticleClick(a.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onArticleClick(a.slug)}
            >
              <div className="article-card__image-wrap">
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  className="article-card__image"
                  loading="lazy"
                />
              </div>
              <div className="article-card__body">
                <div className="article-card__meta">
                  <time className="article-card__date">{a.date}</time>
                  <span className="article-card__date">{readTimesBySlug[a.slug]} min read</span>
                </div>
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
