import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <button
        className="header__logo"
        type="button"
        aria-label="Открыть меню"
      />
      <nav className="header__links">
        <Link className="header__link" to={"./sign-up"}>Регистрация</Link>
        <button className="header__link-btn">
          <Link className="header__link" to={"./sign-in"}>Войти</Link>
        </button>
      </nav>
    </header>

  );
}

export default Header;
