import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <button
        className="logo"
        type="button"
        aria-label="Открыть меню"
      />
      <nav className="header__links">
        <Link className="header__link header__link_text_white" to={"./sign-up"}>Регистрация</Link>
        <button
          className="header__link-btn"
          type="button"
          aria-label="Войти"
          >
          <Link className="header__link header__link_text_black" to={"./sign-in"}>Войти</Link>
        </button>
      </nav>
    </header>

  );
}

export default Header;
