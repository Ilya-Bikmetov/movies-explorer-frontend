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
        <Link className="header__link header__link_text_white" to={"./signup"}>Регистрация</Link>
        <Link className="header__link header__link_text_black header__link_btn" to={"./signin"}>Войти</Link>

      </nav>
    </header>

  );
}

export default Header;
