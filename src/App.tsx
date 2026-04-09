import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Practice } from './components/Practice';
import { Projects } from './components/Projects';
import { Writing } from './components/Writing';
import { Contact } from './components/Contact';
import { ArticlePage } from './components/ArticlePage';
import { articles } from './data/articles';

function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  let attempts = 0;

  const tryScroll = () => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior });
      return;
    }

    if (attempts < 12) {
      attempts += 1;
      window.requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}

interface HomePageProps {
  heroReady: boolean;
  onHeroReady: () => void;
  onOpenArticle: (slug: string) => void;
  onNavigate: (id: string) => void;
  onLogoClick: () => void;
}

function HomePage({ heroReady, onHeroReady, onOpenArticle, onNavigate, onLogoClick }: HomePageProps) {
  useEffect(() => {
    document.body.style.overflow = heroReady ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [heroReady]);

  useEffect(() => {
    if (!heroReady) return;

    let observer: IntersectionObserver;

    const timer = window.setTimeout(() => {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [heroReady]);

  return (
    <>
      {!heroReady && <Loader onDone={onHeroReady} />}
      <Nav onLogoClick={onLogoClick} onNavigate={onNavigate} />
      <main>
        {heroReady && <Hero />}
        <About />
        <Practice />
        <Projects />
        <Writing onArticleClick={onOpenArticle} />
        <Contact />
      </main>
    </>
  );
}

interface ArticleRouteProps {
  onNavigateSection: (id: string) => void;
  onLogoClick: () => void;
}

function ArticleRoute({ onNavigateSection, onLogoClick }: ArticleRouteProps) {
  const navigate = useNavigate();
  const { slug } = useParams();

  const currentArticleIndex = articles.findIndex(article => article.slug === slug);
  if (currentArticleIndex === -1) {
    return <Navigate to='/' replace />;
  }

  const currentArticle = articles[currentArticleIndex];
  const previousArticle = currentArticleIndex > 0 ? articles[currentArticleIndex - 1] : undefined;
  const nextArticle = currentArticleIndex < articles.length - 1 ? articles[currentArticleIndex + 1] : undefined;

  return (
    <>
      <Nav onLogoClick={onLogoClick} onNavigate={onNavigateSection} />
      <ArticlePage
        article={currentArticle}
        onBack={() => onNavigateSection('writing')}
        onOpenArticle={targetSlug => navigate(`/articles/${targetSlug}`)}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
      />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [heroReady, setHeroReady] = useState(false);

  const openArticle = useCallback(
    (slug: string) => {
      navigate(`/articles/${slug}`);
    },
    [navigate]
  );

  const navigateToTop = useCallback(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  }, [location.pathname, navigate]);

  const navigateToSection = useCallback(
    (id: string) => {
      if (id === 'hero') {
        navigateToTop();
        return;
      }

      if (location.pathname === '/') {
        scrollToSection(id);
        return;
      }

      navigate(`/#${id}`);
    },
    [location.pathname, navigate, navigateToTop]
  );

  useEffect(() => {
    if (location.pathname !== '/' || !heroReady) return;

    const sectionId = location.hash.replace('#', '');
    if (!sectionId) return;

    const timer = window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname, heroReady]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePage
            heroReady={heroReady}
            onHeroReady={() => setHeroReady(true)}
            onOpenArticle={openArticle}
            onNavigate={navigateToSection}
            onLogoClick={navigateToTop}
          />
        }
      />
      <Route
        path='/articles/:slug'
        element={<ArticleRoute onNavigateSection={navigateToSection} onLogoClick={navigateToTop} />}
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;

