import { Link, useHistory } from 'react-router-dom';
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Navigation from '../Navigation/Navigation.js';
function Profile({ onOpenNavPanel, onSubmit, onSignOut, isRegIssue, isRegSuccess, onClose }) {
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({ mode: "onChange" });
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const handleClearApiMesssages = () => onClose();

  const handleEditProfileSubmit = (data) => {
    onSubmit({ name: data.name, email: data.email });
  }

  const handleSignout = () => {
    onSignOut();
  }

  useEffect(() => {
    onClose();
  }, [history]);

  useEffect(() => {
    setValue('name', `${currentUser.name}`, { shouldValidate: true });
    setValue('email', `${currentUser.email}`, { shouldValidate: true });
  }, [setValue, currentUser.name, currentUser.email]);

  return (
    <>
      <Navigation
        onOpen={onOpenNavPanel}
      />
      <form onSubmit={handleSubmit(handleEditProfileSubmit)} onFocus={handleClearApiMesssages} className="profile-form profile-form_profile">
        <h1 className="profile-form__title profile-form__title_profile">{`Привет, ${currentUser.name}!`}</h1>
        <div className="profile-container">
          <div className="input-container">
            <div className="profile-line profile-line_border-bottom">
              <p className="profile-name profile-name_bottom-line">Имя</p>
              <input
                className="profile-line__input"
                placeholder={`${currentUser.name}`}
                name="name"
                {...register("name", {
                  required: "Поле имя необходимо заполнить",
                  pattern: {
                    value: /^[а-яА-ЯёЁa-zA-Z-\s]+$/i,
                    message: "Поле Имя должно содержать только латиницу, кириллицу, пробел или дефис"
                  }
                })}
              />
              <p className="profile-form__message profile-form__message_profile profile-form__message_error_active">{errors?.name && <span className="error">{errors?.name?.message || "Поле имя необходимо заполнить"}</span>}</p>
            </div>
          </div>
          <div className="input-container">
            <div className="profile-line">
              <p className="profile-name">E-mail</p>
              <input
                className="profile-line__input"
                placeholder={`${currentUser.email}`}
                name="email"
                type="email"
                {...register("email", {
                  required: "Поле E-mail необходимо заполнить",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                    message: "Введен некорректный E-mail адрес"
                  }
                })}
              />
              <p className="profile-form__message profile-form__message_profile profile-form__message_error_active">{errors?.email && <span className="error" >{errors?.email?.message || "Поле Email необходимо заполнить"}</span>}</p>
            </div>
          </div>

        </div>
        {
          isRegIssue
            ? <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error-profile_active'}`}>Что-то пошло не так...</p>
            : <p className={`profile-form__message ${isRegSuccess && 'profile-form__message_success_active'}`}>Профиль успешно изменен</p>
        }
        <div className='profile-form__links-container'>
          <button
            disabled={!isValid}
            className={`profile-form__profile-subtitle profile-form__profile-subtitle_btn ${!isValid && 'profile-form__profile-subtitle_submit'}`}
            type="submit"
            aria-label="Редактировать"
          >
            Редактировать
          </button>
          <Link onClick={handleSignout} to={"/"} className="profile-form__profile-subtitle profile-form__profile-subtitle_link">Выйти из аккаунта</Link>
        </div>
      </form>
    </>
  );
}

export default Profile;
