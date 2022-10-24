import { Link, NavLink } from 'react-router-dom';

function NavPanel({ onClose, isOpen }) {

  return (
    <section className={`nav-panel ${isOpen && 'nav-panel_active'}`}>
      <div className="nav-panel__container">
        <button onClick={onClose} type="button" aria-label="Закрыть панель" className="nav-panel__close-btn" />
        <nav className="nav-panel__links">
          <Link to="/" className="nav-link nav-link_nav-panel">Главная</Link>
          <NavLink to="/movies" className="nav-link nav-link_nav-panel" activeClassName="nav-link_active nav-link_nav-panel_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="nav-link nav-link_nav-panel" activeClassName="nav-link_active nav-link_nav-panel_active">Сохранённые фильмы</NavLink>
        </nav>
        <Link to={"/profile"} className="icon-link icon-link_nav-panel nav-link_nav-panel">
          <div className="icon-sign">Аккаунт</div>
          <div className="icon-container">
            <div className="icon-account" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NavPanel;
