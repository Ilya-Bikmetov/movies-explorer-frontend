import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
  <section className="navigation">
    <div className="navigation-container">
      <Link to={"/"}
        className="logo logo_movies"
      />
      <nav className="navigation__links">
        <NavLink to="/movies" className="nav-link" activeClassName="nav-link_active">Фильмы</NavLink>
        <NavLink to="/saved-movies" className="nav-link" activeClassName="nav-link_active">Сохраненные фильмы</NavLink>
      </nav>
    </div>
    <nav className="navigation__links">
      <Link to={"/profile"} className="icon-link">
        <div className="icon-sign">Аккаунт</div>
        <div className="icon-container">
          <div className="icon-account" />
        </div>
      </Link>
    </nav>
    <div className="navigation__btn">
      <div className="navigation__btn__element" />
    </div>
  </section>
  );
}

export default Navigation;
