import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    // <header className="header">
    <header className={`header ${location.pathname !== "/" && 'header_main'}`}>
      {location.pathname === "/" &&
        <>
          <div
            className="logo"
            type="button"
            aria-label="Открыть меню"
          />
          <nav className="header__links">
            <Link className="header__link header__link_text_white" to={"./signup"}>Регистрация</Link>
            <Link className="header__link header__link_text_black header__link_btn" to={"./signin"}>Войти</Link>
          </nav>
        </>
      }
      {location.pathname !== "/" &&
        <>
          <div className="header-container">
            <Link to={"/"}
              className="logo logo_movies"
            />
            <nav className="header__links">
              <NavLink to="/movies" className="nav-link" activeClassName="nav-link_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className="nav-link" activeClassName="nav-link_active">Сохраненные фильмы</NavLink>
            </nav>
          </div>
          <nav className="header__links">
            <Link to={"/profile"} className="icon-link">
              <div className="icon-sign">Аккаунт</div>
              <div className="icon-container">
                <div className="icon-account" />
              </div>
            </Link>
          </nav>
        </>
      }
    </header>

  );
}

export default Header;
