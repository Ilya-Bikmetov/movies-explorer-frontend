import MoviesCard from './MoviesCard/MoviesCard.js';

function MoviesCardList() {
  return (
    <section className="movies">
      <ul className="movies__list">
        <MoviesCard />
      </ul>

    </section>
  );
}

export default MoviesCardList;
