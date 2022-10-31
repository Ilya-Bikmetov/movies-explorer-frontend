import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard/MoviesCard.js';

function MoviesCardList() {
  const location = useLocation();

  return (
    <section className="movies">
      <ul className="movies__list">
        {location.pathname === "/movies" &&
          <>
            <MoviesCard />
            <MoviesCard />
          </>
        }
        {location.pathname === "/saved-movies" &&
          <>
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </>
        }
      </ul>
      <div className='movies__btn-container'>
        <button className='movies__btn' type='button' aria-label="Ещё">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
