import Navigation from "../Navigation/Navigation.js";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
function Movies({ onOpen, onSubmit, setPreloaderState, isSwitcherOn, handleLike, handleSwitcher, isPreloaderOn, cards, cardsLiked, isLike, showMessage }) {
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
      <h2 className={`movies-message ${showMessage && 'movies-message_active'}`}>Ничего не найдено</h2>
      <Preloader
        isOn={isPreloaderOn}
      />
      <MoviesCardList
        cards={cards}
        isOn={isPreloaderOn}
        handleLike={handleLike}
        cardsLiked={cardsLiked}
      />
    </>
  );
}

export default Movies;
