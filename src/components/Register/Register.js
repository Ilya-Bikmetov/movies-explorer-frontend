import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
function Register({ onSubmit, isRegSuccess, isRegIssue, onClose }) {
  const history = useHistory();
  const [inputData, setInputData] = useState({ name: '', email: '', password: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: inputData.name, email: inputData.email, password: inputData.password });
  }

  useEffect(() => {
    isRegSuccess && setInputData({ name: '', email: '', password: '' });
  }, [isRegSuccess]);

  useEffect(() => {
    onClose();
  }, [history])

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <Link to={"/"} className="logo logo_login" />
      <h1 className="profile-form__title">Добро пожаловать!</h1>
      <p className="profile-form__input-title">Имя</p>
      <input
        className="profile-form__input"
        name="name"
        placeholder="Имя"
        type="name"
        required
        onChange={handleInputChange}
        value={inputData.name}
      />
      <p className="profile-form__input-title">E-mail</p>
      <input
        className="profile-form__input"
        name="email"
        type="email"
        placeholder="E-mail"
        required
        onChange={handleInputChange}
        value={inputData.email}
      />
      <p className="profile-form__input-title">Пароль</p>
      <input
        className="profile-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
        required
        onChange={handleInputChange}
        value={inputData.password}
      />
      {
        isRegSuccess
          ? <p className={`profile-form__message ${isRegSuccess && 'profile-form__message_success_active'}`}>Регистрация успешна</p>
          : <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error_active'}`}>Что-то пошло не так...</p>
      }
      <button className="profile-form__btn profile-form__btn_signup" type="submit" aria-label="Войти">Зарегистрироваться</button>
      <div className="profile-form__subtitle-container">
        <p className="profile-form__submit-subtitle">Уже зарегистрированы?</p>
        <Link to={"./signin"} className="subtitle-link">Войти</Link>
      </div>
    </form>
  );
}

export default Register;
