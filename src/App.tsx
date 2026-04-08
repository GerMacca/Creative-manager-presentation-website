import { useEffect, useState } from 'react';
import { Loader }   from './components/Loader';
import { Nav }      from './components/Nav';
import { Hero }     from './components/Hero';
import { About }    from './components/About';
import { Practice } from './components/Practice';
import { Projects } from './components/Projects';
import { Writing }  from './components/Writing';
import { Contact }  from './components/Contact';

function App() {
  const [heroReady, setHeroReady] = useState(false);

  // Lock scroll while loader is active
  useEffect(() => {
    document.body.style.overflow = heroReady ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [heroReady]);

  // Set up scroll-reveal observer; re-runs when heroReady flips
  // so Hero elements (if any use data-animate later) are also caught
  useEffect(() => {
    const observer = new IntersectionObserver(
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

    document
      .querySelectorAll('[data-animate]')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [heroReady]);

  return (
    <>
      {!heroReady && <Loader onDone={() => setHeroReady(true)} />}

      <Nav />

      <main>
        {heroReady && <Hero />}
        <About />
        <Practice />
        <Projects />
        <Writing />
        <Contact />
      </main>
    </>
  );
}

export default App;
