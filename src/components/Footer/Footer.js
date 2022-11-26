import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <>
      {
        (location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies") &&
        <section className="footer">
          <p className="footer__sign">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <p className="footer__copyright">&copy;2022</p>
            <div className="footer__links">
              <a href="https://practicum.yandex.ru" target="blank" className="footer__link">Яндекс.Практикум</a>
              <a href="https://github.com" target="blank" className="footer__link">Github</a>
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default Footer;
