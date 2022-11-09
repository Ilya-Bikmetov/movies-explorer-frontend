import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Navigation from '../Navigation/Navigation.js';
function Profile({ onOpenNavPanel, onSubmit, onSignOut, isRegIssue, onClose }) {
  const [inputData, setInputData] = useState({ name: '', email: '' });
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: inputData.name, email: inputData.email });
  }

  const handleSignout = () => {
    onSignOut();
  }

  useEffect(() => {
    onClose();
  }, [history]);

  return (
    <>
      <Navigation
        onOpen={onOpenNavPanel}
      />
      <form onSubmit={handleSubmit} className="profile-form profile-form_profile">
        <h1 className="profile-form__title profile-form__title_profile">{`Привет, ${currentUser.name}!`}</h1>
        <div className="profile-container">
          <div className="profile-line profile-line_border-bottom">
            <p className="profile-name profile-name_bottom-line">Имя</p>
            <input
              className="profile-line__input"
              placeholder={`${currentUser.name}`}
              name="name"
              required
              onChange={handleInput}
              value={inputData.name}
            />
          </div>
          <div className="profile-line">
            <p className="profile-name">E-mail</p>
            <input
              className="profile-line__input"
              placeholder={`${currentUser.email}`}
              name="email"
              type="email"
              required
              onChange={handleInput}
              value={inputData.email}
            />
          </div>
          <p className={`profile-form__message ${isRegIssue && 'profile-form__message_error-profile_active'}`}>Что-то пошло не так...</p>
        </div>
        <div className='profile-form__links-container'>
          <button
            className="profile-form__profile-subtitle profile-form__profile-subtitle_btn"
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
