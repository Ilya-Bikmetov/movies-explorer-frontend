import MoviesCard from './MoviesCard/MoviesCard.js';

function MoviesCardList() {
  return (
    <section className="movies">
      <ul className="movies__list">
        <MoviesCard />
        <MoviesCard />
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </ul>
      <div className='movies__btn-container'>
        <button className='movies__btn' type='button' aria-label="Ещё">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
