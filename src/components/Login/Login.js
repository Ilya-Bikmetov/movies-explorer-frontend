import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
function Login({ onSubmit, isRegIssue, onClose }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: inputData.email, password: inputData.password });
  }

  useEffect(() => {
    onClose();
  }, [history]);

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <Link to={"/"} className="logo logo_login" />
      <h1 className="profile-form__title">Рады видеть!</h1>
      <p className="profile-form__input-title">E-mail</p>
      <input
        className="profile-form__input"
        name="email"
        type="email"
        required
        onChange={handleInput}
        value={inputData.email}
      />
      <p className="profile-form__input-title">Пароль</p>
      <input
        className="profile-form__input"
        name="password"
        type="password"
        required
        onChange={handleInput}
        value={inputData.password}
      />
      <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error_active'}`}>Неправильный логин или пароль</p>

      <button className="profile-form__btn" type="submit" aria-label="Войти">Войти</button>
      <div className="profile-form__subtitle-container">
        <p className="profile-form__submit-subtitle">Ещё не зарегистрированы?</p>
        <Link to={"./signup"} className="subtitle-link">Регистрация</Link>
      </div>
    </form>
  );
}

export default Login;
