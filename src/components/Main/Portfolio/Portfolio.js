function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__sign">Портфолио</p>
      <ul className="portfolio__set">
        <li classname="portfolio__item">
          <a href="https://ilya-bikmetov.github.io/how-to-learn/" target="blank" className="portfolio__container">
            <h2 className="portfolio__title">Статичный сайт</h2>
            <div className="portfolio__arrow" />
          </a>
        </li>
        <li classname="portfolio__item">
          <div className="portfolio__line" />
          <a href="https://ilya-bikmetov.github.io/russian-travel/index.html" target="blank" className="portfolio__container">
            <h2 className="portfolio__title">Адаптивный сайт</h2>
            <div className="portfolio__arrow" />
          </a>
        </li>
        <li classname="portfolio__item">
          <div className="portfolio__line" />
          <a href="https://ilya-bikmetov.github.io/mesto/index.html" target="blank" className="portfolio__container">
            <h2 className="portfolio__title">Одностраничное приложение</h2>
            <div className="portfolio__arrow" />
          </a>
        </li>
      </ul>
    </section >
  );
}

export default Portfolio;
