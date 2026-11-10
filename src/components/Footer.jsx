function Footer({ onBook }) {
  return (
    <footer className="footer">
      <a className="logo footer-logo" href="#home">
        <span className="logo-mark" aria-hidden="true">k.</span>
        <span>kapriz<span className="logo-light">travel</span></span>
      </a>
      <p>Путешествуй. Исследуй. Открывай.</p>
      <button className="back-to-top footer-book" type="button" onClick={onBook}>Оформить тур ↗</button>
      <a className="back-to-top" href="#home">Наверх ↑</a>
      <span className="copyright">© 2026 Kapriz Travel</span>
    </footer>
  );
}

export default Footer;
