import { useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import MoviesCard from './MoviesCard/MoviesCard.js';

function MoviesCardList({ cards, cardsLiked, setCardsLiked, isOn, handleLike, handleBtnMore, countRenderCards, isBtnMoreOn }) {
  const location = useLocation();
  // const [isBtnMoreOn, setBtnMoreState] = useState(true);

  const handleMoreBtn = () => {
    if (window.innerWidth >= 1280)
      handleBtnMore(countRenderCards + 3);
    if (window.innerWidth > 480 && window.innerWidth < 1280)
      handleBtnMore(countRenderCards + 2)
    if (window.innerWidth <= 480)
      handleBtnMore(countRenderCards + 1);
  }

  // useEffect(() => {
  //   JSON.parse(localStorage.getItem('moviesFound')).length === countRenderCards && setBtnMoreState(false);
  // }, [countRenderCards]);

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
              setCardsLiked={setCardsLiked}
            />
          ))
        }
      </ul>
      <div className="movies__btn-container" style={

        location.pathname === "/saved-movies" || !isBtnMoreOn
          ? { display: "none" }
          : { display: "flex" }
      }>
        <button onClick={handleMoreBtn} className='movies__btn' type='button' aria-label="Ещё">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
