import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { imgUrl } from '../../../utils/constants.js';

function MoviesCard({ card, handleLike, cardsLiked }) {
  const [isLiked, setLike] = useState(false);
  const [isPointed, setPoint] = useState(false);
  const location = useLocation();


  const changeLike = () => {
    handleLike(isLiked, card);
  }


  useEffect(() => {
    setLike(JSON.parse(localStorage.getItem('moviesSavedApi')).some((c) => (Number(c.movieId) === Number(card.id))));
  }, [])

  return (
    <li className="movie">
      <a href={card.trailerLink} className="movie__trailer" target="blank">
        <img className="movie__photo" src={`${imgUrl}/${card.image.url}`} alt="фото фильма" />
      </a>
      {
        location.pathname === "/movies" &&
        <>
          <div className="movie__sign">
            <h2 className="movie__title">{card.nameRU}</h2>
            <button onClick={changeLike} className={`movie__like ${isLiked && 'movie__like_active'}`} type="button" aria-label="Поставить лайк" />
          </div>
          <p className="movie__duration">{Math.floor(card.duration / 60)} ч {Math.floor(card.duration % 60)} м</p>
        </>
      }
      {
        location.pathname === "/saved-movies" &&
        <>
          <div onMouseOver={() => setPoint(true)} onMouseOut={() => setPoint(false)} className="movie__sign movie__sign_saved">
            <h2 className="movie__title">33 слова о дизайне</h2>
            <button onMouseOver={() => setPoint(true)} className={`movie__delete ${isPointed && 'movie__delete_active'}`} type='button' aria-label="Поставить лайк" />
          </div>
          <p className="movie__duration">1ч 47м</p>
        </>
      }

    </li >

  );
}

export default MoviesCard;
