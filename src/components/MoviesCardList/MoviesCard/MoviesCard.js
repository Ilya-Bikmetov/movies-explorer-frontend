import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const [isLiked, setLike] = useState(false);
  const [isPointed, setPoint] = useState(false);
  const location = useLocation();

  const changeLike = () => {
    if (isLiked) {
      setLike(false);
    } else {
      setLike(true);
    }
  }
  return (
    <li className="movie">
      <img className="movie__photo" src="https://sntat.ru/resize/750/images/uploads/news/2019/11/28/81ceea5980718472ffa6b1726b8e44e4f5f561e50ab870d88294dcde6c55.jpg" alt="фото фильма" />
      {
        location.pathname === "/movies" &&
        <div className="movie__sign">
          <h2 className="movie__title">33 слова о дизайне</h2>
          <button onClick={changeLike} className={`movie__like ${isLiked && 'movie__like_active'}`} type="button" aria-label="Поставить лайк" />
        </div>

      }
      {
        location.pathname === "/saved-movies" &&
        <div onMouseOver={() => setPoint(true)} onMouseOut={() => setPoint(false)} className="movie__sign movie__sign_saved">
          <h2 className="movie__title">33 слова о дизайне</h2>
          <button onMouseOver={() => setPoint(true)} className={`movie__delete ${isPointed && 'movie__delete_active'}`} type='button' aria-label="Поставить лайк" />
        </div>
      }

      <p className="movie__duration">1ч 47м</p>
    </li>

  );
}

export default MoviesCard;
