function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__sign">Портфолио</p>
      <div className="portfolio__set">
        <div className="portfolio__container">
          <h2 className="portfolio__title">Статичный сайт</h2>
          <a href="https://ilya-bikmetov.github.io/how-to-learn/">
            <div className="portfolio__arrow" />
          </a>
        </div>
        <div className="portfolio__container">
          <h2 className="portfolio__title">Адаптивный сайт</h2>
          <a href="https://ilya-bikmetov.github.io/russian-travel/index.html">
            <div className="portfolio__arrow" />
          </a>
        </div>
        <div className="portfolio__container">
          <h2 className="portfolio__title">Одностраничное приложение</h2>
          <a href="https://ilya-bikmetov.github.io/mesto/index.html">
            <div className="portfolio__arrow" />
          </a>
        </div>
      </div>
    </div >
  );
}

export default Portfolio;
