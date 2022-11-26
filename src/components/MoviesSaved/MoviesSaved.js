import Navigation from "../Navigation/Navigation.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function MoviesSaved({ onOpen, onSubmit, showMessage, cardsLiked, setCardsLiked, handleLike, onSumbitSaved, resetPage, isSwitcherSavedOn, handleSwitcherSaved }) {
  const history = useHistory();
  useEffect(() => {
    resetPage();
  }, [history])
  return (
    <>
      <Navigation
        onOpen={onOpen}
      />
      <SearchForm
        onSubmit={onSubmit}
        isSwitcherSavedOn={isSwitcherSavedOn}
        handleSwitcherSaved={handleSwitcherSaved}
        onSumbitSaved={onSumbitSaved}
      />
      <h2 className={`movies-message ${showMessage.state && 'movies-message_active'}`}>{showMessage.message}</h2>
      <MoviesCardList
        cardsLiked={cardsLiked}
        setCardsLiked={setCardsLiked}
        handleLike={handleLike}
      />
    </>
  );
}

export default MoviesSaved;
