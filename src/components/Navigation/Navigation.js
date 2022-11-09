import { Link, NavLink, useLocation } from "react-router-dom";

function Navigation({ onOpen }) {
  const location = useLocation();

  const openPanel = () => {
    onOpen();
  }

  return (
        <section className={`navigation ${location.pathname === "/" && 'navigation_mainpage'} ${location.pathname === "/profile" && 'navigation_profile'}`}>
          <div className="navigation-container">
            <Link to={"/"}
              className="logo logo_movies"
            />
            <nav className="navigation__links">
              <NavLink to="/movies" className={`nav-link ${location.pathname === "/" && 'nav-link_mainpage'}`} activeClassName="nav-link_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className={`nav-link ${location.pathname === "/" && 'nav-link_mainpage'}`} activeClassName="nav-link_active">Сохраненные фильмы</NavLink>
            </nav>
          </div>
          <nav className="navigation__links">
            <Link to={"/profile"} className="icon-link">
              <div className={`icon-sign ${location.pathname === "/" && 'icon-sign_mainpage'}`}>Аккаунт</div>
              <div className="icon-container">
                <div className="icon-account" />
              </div>
            </Link>
          </nav>
          <button onClick={openPanel} type="button" aria-label="Открыть панель" className="navigation__btn">
            <div className={`navigation__btn__element ${location.pathname === "/" && 'navigation__btn__element_mainpage'}`} />
          </button>
        </section>
  );
}

export default Navigation;
