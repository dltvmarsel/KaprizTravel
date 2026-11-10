function Header({ onBook }) {
  return (
    <header className="header">
      <a className="logo" href="#home" aria-label="Kapriz Travel — на главную">
        <span className="logo-mark" aria-hidden="true">k.</span>
        <span>kapriz<span className="logo-light">travel</span></span>
      </a>
      <nav aria-label="Основная навигация">
        <a href="#home">Главная</a>
        <a href="#tours">Туры</a>
        <a href="#about">О нас</a>
      </nav>
      <button className="header-cta" type="button" onClick={onBook}>
        Спланировать поездку <span aria-hidden="true">↗</span>
      </button>
    </header>
  );
}

export default Header;
