import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Login({ onSubmit, isRegIssue, onClose }) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: "onChange" });
  const history = useHistory();
  const handleClearApiError = () => onClose();
  const handleLoginSubmit = (data) => {
    onSubmit({ email: data.email, password: data.password });
    reset();
  }

  useEffect(() => {
    onClose();
  }, [history]);

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)} onFocus={handleClearApiError} className="profile-form">
      <Link to={"/"} className="logo logo_login" />
      <h1 className="profile-form__title">Рады видеть!</h1>
      <p className="profile-form__input-title">E-mail</p>
      <div className="input-container">
        <input
          className="profile-form__input"
          name="email"
          type="email"
          {...register("email", {
            required: "Поле обязательно к заполнению",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Введен некорректный E-mail адрес"
            }
          })}
        />
        <p className="profile-form__message profile-form__message_error_active">{errors?.email && <span className="error" >{errors?.email?.message || "Поле Email необходимо заполнить"}</span>}</p>
      </div>
      <p className="profile-form__input-title profile-form__input-title_bottom">Пароль</p>
      <div className="input-container">
        <input
          className="profile-form__input"
          name="password"
          type="password"
          {...register("password", {
            required: "Поле пароль необходимо заполнить",
          })}
        />
        <p className="profile-form__message profile-form__message_error_active">{errors?.password && <span className="error">{errors?.password?.message || "Поле пароль необходимо заполнить"}</span>}</p>
        <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error_active'}`}>Неправильный логин или пароль</p>
      </div>

      <button disabled={!isValid} className={`profile-form__btn ${!isValid && 'profile-form__btn_disabled'}`} type="submit" aria-label="Войти">Войти</button>
      <div className="profile-form__subtitle-container">
        <p className="profile-form__submit-subtitle">Ещё не зарегистрированы?</p>
        <Link to={"./signup"} className="subtitle-link">Регистрация</Link>
      </div>
    </form>
  );
}

export default Login;
