import Navigation from "../Navigation/Navigation.js";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
function Movies({ onOpen, onSubmit, setPreloaderState, isSwitcherOn, handleLike, handleSwitcher, isPreloaderOn, cards, isLike }) {
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
      <Preloader
        isOn={isPreloaderOn}
      />
      <MoviesCardList
        isLike={isLike}
        cards={cards}
        isOn={isPreloaderOn}
        handleLike={handleLike}
      />
    </>
  );
}

export default Movies;
