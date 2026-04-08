import './Contact.css';

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <span className="contact__label" data-animate="fade-up">
          Get in touch
        </span>

        <h2
          className="contact__heading"
          data-animate="fade-up"
          style={{ '--delay': '0.1s' } as React.CSSProperties}
        >
          Let's create<br />
          <em>something together</em>
        </h2>

        <a
          href="mailto:arturmacca@gmail.com"
          className="contact__email"
          data-animate="fade-up"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          arturmacca@gmail.com
        </a>

        <div
          className="contact__links"
          data-animate="fade-up"
          style={{ '--delay': '0.3s' } as React.CSSProperties}
        >
          <a href="tel:+393791528337" className="contact__link">
            <span className="contact__link-label">Phone</span>
            <span>+39 379 152 8337</span>
          </a>
          <a
            href="https://instagram.com/arturmaccagnan"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-label">Instagram</span>
            <span>@arturmaccagnan</span>
          </a>
          <a
            href="https://linkedin.com/in/arturmaccagnan"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-label">LinkedIn</span>
            <span>arturmaccagnan</span>
          </a>
        </div>

        <div
          className="contact__bottom"
          data-animate="fade-up"
          style={{ '--delay': '0.4s' } as React.CSSProperties}
        >
          <p className="contact__location">Florence, Italy — Available worldwide</p>
          <p className="contact__copyright">© 2025–2026 Artur Maccagnan</p>
        </div>
      </div>

      <span className="contact__bg-word" aria-hidden="true">ARTUR</span>
    </section>
  );
}
