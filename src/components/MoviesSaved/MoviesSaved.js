import Navigation from "../Navigation/Navigation.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function MoviesSaved({ onOpen, onSubmit, setPreloaderState, isSwitcherOn, handleSwitcher, cardsLiked, setCardsLiked, handleLike, onSumbitSaved }) {
  return (
    <>
      <Navigation
        onOpen={onOpen}
      />
      <SearchForm
        onSubmit={onSubmit}
        setPreloaderState={setPreloaderState}
        isSwitcherOn={isSwitcherOn}
        handleSwitcher={handleSwitcher}
        onSumbitSaved={onSumbitSaved}
      />
      <MoviesCardList
        cardsLiked={cardsLiked}
        setCardsLiked={setCardsLiked}
        handleLike={handleLike}
      />
    </>
  );
}

export default MoviesSaved;
