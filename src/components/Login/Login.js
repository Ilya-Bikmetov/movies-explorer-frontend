function Login() {
  return (
    <>
      <form className="profile-form">
        <div className="logo logo_login" />
        <h1 className="profile-form__title">Рады видеть!</h1>
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
      </form>
    </>
  );
}

export default Login;
