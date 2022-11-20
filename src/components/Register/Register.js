import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Register({ onSubmit, isRegSuccess, isRegIssue, onClose }) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: "onChange" });
  const history = useHistory();
  const handleClearApiError = () => onClose();

  const handleSignUpSubmit = (data) => {
    onSubmit({ name: data.name, email: data.email, password: data.password });
    reset();
  }

  useEffect(() => {
    onClose();
  }, [history])

  return (
    <form onSubmit={handleSubmit(handleSignUpSubmit)} onFocus={handleClearApiError} className="profile-form">
      <Link to={"/"} className="logo logo_login" />
      <h1 className="profile-form__title">Добро пожаловать!</h1>
      <p className="profile-form__input-title">Имя</p>
      <div className="input-container">
        <input
          className="profile-form__input"
          name="name"
          placeholder="Имя"
          type="name"
          {...register("name", {
            required: "Поле имя необходимо заполнить",
            pattern: {
              value: /^[а-яА-ЯёЁa-zA-Z-\s]+$/i,
              message: "Поле Имя должно содержать только латиницу, кириллицу, пробел или дефис"
            }
          })}
        />
        <p className="profile-form__message profile-form__message_error_active">{errors?.name && <span className="error">{errors?.name?.message || "Поле имя необходимо заполнить"}</span>}</p>
      </div>
      <p className="profile-form__input-title profile-form__input-title_bottom">E-mail</p>
      <div className="input-container">
        <input
          className="profile-form__input"
          name="email"
          type="email"
          placeholder="E-mail"
          {...register("email", {
            required: "Поле E-mail необходимо заполнить",
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
          placeholder="Пароль"
          {...register("password", {
            required: "Поле пароль необходимо заполнить",
          })}
        />
        <p className="profile-form__message profile-form__message_error_active">{errors?.password && <span className="error">{errors?.password?.message || "Поле пароль необходимо заполнить"}</span>}</p>
        {
          isRegSuccess
            ? <p className={`profile-form__message ${isRegSuccess && 'profile-form__message_success_active profile-form__message_error_active'}`}>Регистрация успешна</p>
            : <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error_active profile-form__message_error_active'}`}>Что-то пошло не так...</p>
        }
      </div>
      <button className={`profile-form__btn profile-form__btn_signup ${!isValid && 'profile-form__btn_disabled'}`} type="submit" aria-label="Войти">Зарегистрироваться</button>
      <div className="profile-form__subtitle-container">
        <p className="profile-form__submit-subtitle">Уже зарегистрированы?</p>
        <Link to={"./signin"} className="subtitle-link">Войти</Link>
      </div>
    </form>
  );
}

export default Register;
