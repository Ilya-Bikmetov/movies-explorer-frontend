import { Link, useLocation } from 'react-router-dom';
function Profile() {
  const location = useLocation();
  const name = 'Виталий';
  const email = 'pochta@yandex.ru'
  return (
      <form className="profile-form profile-form_profile">
        <h1 className="profile-form__title profile-form__title_profile">Привет, Виталий!</h1>
        <div className="profile-container">
          <div className="profile-line profile-line_border-bottom">
            <p className="profile-name profile-name_bottom-line">Имя</p>
            <input
              className="profile-line__input"
              placeholder={`${name}`}
              name="name"
              required
            />
          </div>
          <div className="profile-line">
            <p className="profile-name">E-mail</p>
            <input
              className="profile-line__input"
              placeholder={`${email}`}
              name="email"
              type="email"
              required
            />
          </div>
        </div>
        <div className='profile-form__links-container'>
          <button
            className="profile-form__profile-subtitle profile-form__profile-subtitle_btn"
            type="submit"
            aria-label="Редактировать"
          >
            Редактировать
          </button>
          <Link to={"/"} className="profile-form__profile-subtitle profile-form__profile-subtitle_link">Выйти из аккаунта</Link>
        </div>
      </form>
  );
}

export default Profile;
