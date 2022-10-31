import { Link } from "react-router-dom";
function Register() {
  return (
      <form className="profile-form">
        <Link to={"/"} className="logo logo_login" />
        <h1 className="profile-form__title">Добро пожаловать!</h1>
        <p className="profile-form__input-title">Имя</p>
        <input
          className="profile-form__input"
          name="name"
          required
        />
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
        <p className="profile-form__error">Что-то пошло не так...</p>
          <button className="profile-form__btn profile-form__btn_signup " type="submit" aria-label="Войти">Зарегистрироваться</button>
          <div className="profile-form__subtitle-container">
            <p className="profile-form__submit-subtitle">Уже зарегистрированы?</p>
            <Link to={"./signin"} className="subtitle-link">Войти</Link>
          </div>
      </form>
  );
}

export default Register;
