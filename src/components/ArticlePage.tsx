import { Fragment, useEffect, useMemo, useState } from 'react';
import type { ArticleData } from '../data/articles';
import { estimateReadTimeMinutes } from '../utils/readTime';
import './ArticlePage.css';

interface Props {
  article: ArticleData;
  onBack: () => void;
  onOpenArticle: (slug: string) => void;
  previousArticle?: ArticleData;
  nextArticle?: ArticleData;
}

export function ArticlePage({ article, onBack, onOpenArticle, previousArticle, nextArticle }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareState, setShareState] = useState<'idle' | 'done' | 'error'>('idle');

  const bodyContent = useMemo(() => article.body(), [article]);
  const readTimeMinutes = useMemo(() => estimateReadTimeMinutes(bodyContent), [bodyContent]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [article.slug]);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [article.slug]);

  const handleShare = async () => {
    const articleUrl = window.location.href;
    const browserNavigator = window.navigator as Navigator & {
      share?: (data: ShareData) => Promise<void>;
      clipboard?: Clipboard;
    };

    try {
      if (typeof browserNavigator.share === 'function') {
        await browserNavigator.share({ title: article.title, url: articleUrl });
      } else if (browserNavigator.clipboard?.writeText) {
        await browserNavigator.clipboard.writeText(articleUrl);
      } else {
        throw new Error('Clipboard unavailable');
      }

      setShareState('done');
      window.setTimeout(() => setShareState('idle'), 1800);
    } catch {
      setShareState('error');
      window.setTimeout(() => setShareState('idle'), 1800);
    }
  };

  return (
    <div className="article-page">
      <div
        className="article-page__progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <button className="article-page__back" onClick={onBack}>
        <span className="article-page__back-label">Go back</span>
      </button>

      <div className="article-page__container">
        <header>
          <p className="article-page__meta">
            <time dateTime={article.datetime}>{article.date}</time>
            <span className="article-page__meta-dot">.</span>
            <span>{readTimeMinutes} min read</span>
            {article.tags.map(tag => (
              <Fragment key={tag}>
                <span className="article-page__meta-dot">.</span>
                <span>{tag}</span>
              </Fragment>
            ))}
          </p>

          <h1 className="article-page__title">{article.title}</h1>
          <p className="article-page__author">by Artur Maccagnan</p>
          <button className="article-page__share" onClick={handleShare}>
            {shareState === 'idle' && 'Share article'}
            {shareState === 'done' && 'Link shared'}
            {shareState === 'error' && 'Unable to share'}
          </button>
        </header>

        <figure className="article-page__cover">
          <img src={article.image} alt={article.imageAlt} loading="lazy" />
          {article.imageCredit && (
            <figcaption className="article-page__figcaption">{article.imageCredit}</figcaption>
          )}
        </figure>

        <section className="article-page__body">{bodyContent}</section>

        {article.references.length > 0 && (
          <aside className="article-page__references">
            <h3>References</h3>
            <ul>
              {article.references.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </aside>
        )}

        <nav className="article-page__pager" aria-label="Article navigation">
          <button
            className="article-page__pager-btn"
            onClick={() => previousArticle && onOpenArticle(previousArticle.slug)}
            disabled={!previousArticle}
          >
            {previousArticle ? `Previous: ${previousArticle.title}` : 'No previous article'}
          </button>

          <button
            className="article-page__pager-btn"
            onClick={() => nextArticle && onOpenArticle(nextArticle.slug)}
            disabled={!nextArticle}
          >
            {nextArticle ? `Next: ${nextArticle.title}` : 'No next article'}
          </button>
        </nav>
      </div>
    </div>
  );
}
