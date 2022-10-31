import { Link } from "react-router-dom";
function Login() {
  return (
      <form className="profile-form">
        <Link to={"/"} className="logo logo_login" />
        <h1 className="profile-form__title">Рады видеть!</h1>
        <p className="profile-form__input-title">E-mail</p>
        <input
          className="profile-form__input"
          name="email"
          type="email"
          required
        />
        <p className="profile-form__input-title">Пароль</p>
        <input
          className="profile-form__input"
          name="password"
          type="password"
          required
        />
          <button className="profile-form__btn" type="submit" aria-label="Войти">Войти</button>
          <div className="profile-form__subtitle-container">
            <p className="profile-form__submit-subtitle">Ещё не зарегистрированы?</p>
            <Link to={"./signup"} className="subtitle-link">Регистрация</Link>
          </div>
      </form>
  );
}

export default Login;
