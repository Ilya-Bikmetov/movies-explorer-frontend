import Navigation from "../Navigation/Navigation.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function MoviesSaved({ onOpen, onSubmit, setPreloaderState, isSwitcherOn, handleSwitcher, cardsLiked, handleLike }) {
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
      />
      <MoviesCardList
      cardsLiked={cardsLiked}
      handleLike={handleLike}
       />
    </>
  );
}

export default MoviesSaved;
