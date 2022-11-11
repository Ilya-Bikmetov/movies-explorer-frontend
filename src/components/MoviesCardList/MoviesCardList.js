import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard/MoviesCard.js';

function MoviesCardList({ cards, cardsLiked, isOn, handleLike }) {
  const location = useLocation();

  return (
    <section className={`movies ${isOn && 'movies_disabled'}`}>
      <ul className="movies__list">
        {location.pathname === "/movies" &&
          cards.map((card, index) => (
            <MoviesCard
              key={index}
              card={card}
              handleLike={handleLike}
              cardsLiked={cardsLiked}
            />
          ))
        }
        {location.pathname === "/saved-movies" &&
          cardsLiked.map((card, index) => (
            <MoviesCard
              key={index}
              card={card}
              handleLike={handleLike}
              cardsLiked={cardsLiked}
            />
          ))
        }
      </ul>
      <div className='movies__btn-container'>
        <button className='movies__btn' type='button' aria-label="Ещё">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
