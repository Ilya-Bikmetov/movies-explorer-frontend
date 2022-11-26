import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Promo from "../Promo/Promo.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import MoviesSaved from '../MoviesSaved/MoviesSaved.js';
import NavPanel from '../NavPanel/NavPanel.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import * as MainApi from '../../utils/MainApi.js'
import * as MoviesApi from '../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Navigation from '../Navigation/Navigation';
import { countRenderCardsOver1280, countRenderCardsLess1280, countRenderCardsLess480 } from '../../utils/constants.js';

function App() {
  const [cards, setCards] = useState([]);
  const [cardsLiked, setCardsLiked] = useState([]);
  const [isPreloaderOn, setPreloaderState] = useState(false);
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);
  const [isShortMoviesOn, setShortMoviesSwitcher] = useState(false);
  const [isShortMoviesSavedOn, setShortMoviesSavedSwitcher] = useState(false);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isRegIssue, setRegIssue] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', id: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFindMessageOn, setFindMessage] = useState({ state: false, message: '' });
  const [isFindSavedMessageOn, setFindSavedMessage] = useState({ state: false, message: '' });
  const [countRenderCards, setCountRenderCards] = useState(0);
  const [isBtnMoreOn, setBtnMoreState] = useState(false);
  const [path, setPath] = useState('');
  const history = useHistory();
  const location = useLocation();

  const closeNavPanel = () => setNavPanelOpen(false);
  const openNavPanel = () => setNavPanelOpen(true);
  const getMoviesStorage = () => JSON.parse(localStorage.getItem('movies'))
  const getSearchField = () => JSON.parse(localStorage.getItem('searchField'));
  const getCurrentLikedCards = () => JSON.parse(localStorage.getItem('moviesLiked'));
  const getMoviesBySearchField = () => getMoviesStorage().filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(getSearchField().replace(/ /g, '').toLowerCase()))
  const handleCookieDamaged = () => {
    clearData();
    console.log('Cookie поврежден или удален');
  }

  const clearData = () => {
    setLoggedIn(false);
    localStorage.clear();
    setCards([]);
    setCardsLiked([]);
    setFindMessage({ state: false, message: '' });
    setShortMoviesSwitcher(false);
    window.removeEventListener('resize', handleCardsRender);
  }
  const closeNotices = () => {
    isRegSuccess && setRegSuccess(false);
    isRegIssue && setRegIssue(false);
  }

  const handleShortMoviesSwitcher = (state) => {
    setFindMessage({ state: false, message: '' });
    if (state === true) {
      if (typeof (localStorage.searchField) !== 'undefined') {
        const shortMovieCards = getMoviesBySearchField().filter((card) => card.duration <= 40);
        shortMovieCards.length === 0 && setFindMessage({ state: true, message: 'Ничего не найдено' });
        setCards(shortMovieCards.slice(0, countRenderCards))
        handleHideBtnMore(shortMovieCards);
        localStorage.setItem('shortMoviesSwitcher', JSON.stringify(true));
        setShortMoviesSwitcher(state);
      }
    }
    else {
      if (typeof (localStorage.searchField) !== 'undefined') {
        const cardsRegular = getMoviesBySearchField()
        setCards(cardsRegular.slice(0, countRenderCards));
        localStorage.setItem('shortMoviesSwitcher', JSON.stringify(false));
        setShortMoviesSwitcher(state);
        handleHideBtnMore(cardsRegular);
      }
    }
  };

  const handleShortMoviesSavedSwitcher = (state) => {
    setFindSavedMessage({ state: false, message: '' });
    if (state === true) {
      const shortMovieLikedCards = getCurrentLikedCards().filter((card) => card.duration <= 40);
      setCardsLiked(shortMovieLikedCards);
      setShortMoviesSavedSwitcher(state);
    } else {
      setCardsLiked(getCurrentLikedCards);
      setShortMoviesSavedSwitcher(state);
    }
  };

  const getMovies = async () => {
    try {
      const movies = await MoviesApi.getContent();
      localStorage.setItem('movies', JSON.stringify(movies));
    }
    catch (err) {
      console.log(err);
    }
  }

  const findMovies = ({ movie }) => {
    setPreloaderState(true);
    setFindMessage(false);
    if (JSON.parse(localStorage.getItem('shortMoviesSwitcher'))) {
      localStorage.setItem('searchField', JSON.stringify(movie));
      handleShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
    } else {
      localStorage.setItem('searchField', JSON.stringify(movie));
      const moviesFound = getMoviesStorage().filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()));
      if (moviesFound.length > 0) {
        setCards(moviesFound.slice(0, countRenderCards));
      } else {
        setFindMessage({ state: true, message: 'Ничего не найдено' });
        setBtnMoreState(false);
        setCards([]);
      }
    }
    handleCardsRender();
    setPreloaderState(false);
  }

  const findSavedMovies = ({ movie }) => {
    setPreloaderState(true);
    setFindSavedMessage({ state: false, message: '' });
    if (isShortMoviesSavedOn) {
      const shortMovieLikedCards = getCurrentLikedCards().filter((card) => card.duration <= 40);
      const shortMoviesLikedCardsBySearch = shortMovieLikedCards.filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()));
      shortMoviesLikedCardsBySearch.length === 0 && setFindSavedMessage({ state: true, message: 'Ничего не найдено' });
      setCardsLiked(shortMoviesLikedCardsBySearch);
      setPreloaderState(false);
    } else {
      const moviesSavedFound = JSON.parse(localStorage.getItem('moviesLiked')).filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()));
      moviesSavedFound.length === 0 && setFindSavedMessage({ state: true, message: 'Ничего не найдено' });
      setCardsLiked(moviesSavedFound);
      setPreloaderState(false);
    }
  }

  const handleSignupSubmit = async ({ name, email, password }) => {
    try {
      await MainApi.signup({ name, email, password });
      setRegSuccess(true);
      setTimeout(() => handleSigninSubmit({ email, password }), 1000);
    } catch (err) {
      console.log(err);
      setRegIssue(true);
    }
  }

  const handleSigninSubmit = async ({ email, password }) => {
    try {
      await MainApi.signin({ email, password });
      setLoggedIn(true);
      localStorage.setItem('jwt', true);
    } catch (err) {
      console.log(err);
      setRegIssue(true);
    }
  }

  const handleSignout = async () => {
    try {
      await MainApi.clearJwtCookie();
      clearData();
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditProfile = async ({ name, email }) => {
    try {
      await MainApi.editProfile({ name, email });
      setCurrentUser({ name, email });
      setRegSuccess(true);
    } catch (err) {
      setRegIssue(true);
      console.log(err);
    }
  }

  const getContent = async () => {
    try {
      const data = await MainApi.getContent();
      if (data.user) {
        setLoggedIn(true);
        setCurrentUser({ name: data.user.name, email: data.user.email, id: data.user._id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkContent = async () => {
    try {
      const data = await MainApi.getContent();
      if (data.user) {
        setLoggedIn(true);
        window.addEventListener('resize', () => setTimeout(handleCardsRender, 500));
      }
    } catch (err) {
      console.log(err);
      handleCookieDamaged();
    }
  }

  const getLikedMoviesApi = async () => {
    const moviesLiked = await MainApi.getMoviesLiked();
    localStorage.setItem('moviesLiked', JSON.stringify(moviesLiked));
    setCardsLiked(moviesLiked.reverse());
  }

  const handleLike = async (like, card) => {
    try {
      let movieId;
      const cardLiked = cardsLiked.find((c) => Number(c.movieId) === Number(card.id));
      cardLiked
        ? movieId = cardLiked._id
        : movieId = card._id
      const newCard = await MainApi.changeLikeCardStatus(like, card, movieId);
      if (!like) {
        setCardsLiked([newCard, ...cardsLiked]);
        let moviesLiked = JSON.parse(localStorage.getItem('moviesLiked'));
        moviesLiked.push(newCard);
        localStorage.setItem('moviesLiked', JSON.stringify(moviesLiked));
      } else {
        setCardsLiked(cardsLiked.filter((c) => c._id !== newCard._id));
        const moviesLiked = JSON.parse(localStorage.getItem('moviesLiked')).filter((c) => Number(c.movieId) !== Number(newCard.movieId));
        localStorage.setItem('moviesLiked', JSON.stringify(moviesLiked));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleBtnMore = (count) => {
    setCountRenderCards(count);
  }

  const handleHideBtnMore = (cardList) => {
    if (window.innerWidth >= 1280)
      cardList.length <= countRenderCardsOver1280
        ? setBtnMoreState(false)
        : setBtnMoreState(true)
    if (window.innerWidth > 480 && window.innerWidth < 1280)
      cardList.length <= countRenderCardsLess1280
        ? setBtnMoreState(false)
        : setBtnMoreState(true)
    if (window.innerWidth <= 480)
      cardList.length <= countRenderCardsLess480
        ? setBtnMoreState(false)
        : setBtnMoreState(true)
  }

  const renderCards = () => {
    if (typeof (localStorage.searchField) !== 'undefined') {
      setPreloaderState(false);
      handleShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
      setShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
    }
  }

  const handleCardsRender = () => {

    if (window.innerWidth >= 1280) {
      setCountRenderCards(countRenderCardsOver1280);
      if (typeof (localStorage.searchField) !== 'undefined') {
        getMoviesBySearchField().length <= countRenderCardsOver1280
          ? setBtnMoreState(false)
          : setBtnMoreState(true)
      }
    }
    if (window.innerWidth > 480 && window.innerWidth < 1280) {
      setCountRenderCards(countRenderCardsLess1280);
      if (typeof (localStorage.searchField) !== 'undefined') {
        getMoviesBySearchField().length <= countRenderCardsLess1280
          ? setBtnMoreState(false)
          : setBtnMoreState(true)
      }
    }
    if (window.innerWidth <= 480) {
      setCountRenderCards(countRenderCardsLess480);
      if (typeof (localStorage.searchField) !== 'undefined') {
        getMoviesBySearchField().length <= countRenderCardsLess480
          ? setBtnMoreState(false)
          : setBtnMoreState(true)
      }
    }
  }

  const handleResetSavedMoviesPage = () => {
    setFindSavedMessage({ state: false, message: '' });
    setShortMoviesSavedSwitcher(false);
    setCardsLiked(JSON.parse(localStorage.getItem('moviesLiked')).reverse());
  }

  useEffect(() => {
    if (loggedIn) {
      history.push(path);
      (location.pathname === "/signin" || location.pathname === "/signup") && history.push('movies');
      getMovies();
      handleCardsRender();
      getContent();
      getLikedMoviesApi();
      handleShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
      setShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
      if (typeof (localStorage.shortMoviesSwitcher) !== 'undefined') {
        getMoviesBySearchField().length === 0 && setFindMessage({ state: true, message: 'Ничего не найдено' })
      }
      setBtnMoreState(false);
    }

  }, [loggedIn, history]);

  useEffect(() => {
    setPath(location.pathname);
    const jwt = localStorage.getItem('jwt');
    if (jwt === 'true') {
      checkContent();
    }
  }, []);

  useEffect(() => {

    if (typeof (localStorage.searchField) !== 'undefined') {
      renderCards();
      countRenderCards >= getMoviesBySearchField().length && setBtnMoreState(false);
    }
  }, [countRenderCards]);


  return (
    <section className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            {
              !loggedIn
                ?
                <Header />
                :
                <Navigation
                  onOpen={openNavPanel}
                />
            }
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            onOpen={openNavPanel}
            onSubmit={findMovies}
            setPreloaderState={setPreloaderState}
            isSwitcherOn={isShortMoviesOn}
            handleSwitcher={handleShortMoviesSwitcher}
            isPreloaderOn={isPreloaderOn}
            cards={cards}
            cardsLiked={cardsLiked}
            handleLike={handleLike}
            showMessage={isFindMessageOn}
            handleBtnMore={handleBtnMore}
            countRenderCards={countRenderCards}
            isBtnMoreOn={isBtnMoreOn}
          >
          </ProtectedRoute>
          <ProtectedRoute
            path="/saved-movies"
            component={MoviesSaved}
            loggedIn={loggedIn}
            onOpen={openNavPanel}
            onSubmit={findMovies}
            setPreloaderState={setPreloaderState}
            isSwitcherOn={isShortMoviesOn}
            handleSwitcher={handleShortMoviesSwitcher}
            isSwitcherSavedOn={isShortMoviesSavedOn}
            handleSwitcherSaved={handleShortMoviesSavedSwitcher}
            handleLike={handleLike}
            cardsLiked={cardsLiked}
            showMessage={isFindSavedMessageOn}
            setCardsLiked={setCardsLiked}
            onSumbitSaved={findSavedMovies}
            resetPage={handleResetSavedMoviesPage}
          >
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onOpenNavPanel={openNavPanel}
            onSubmit={handleEditProfile}
            onSignOut={handleSignout}
            onClose={closeNotices}
            isRegSuccess={isRegSuccess}
            isRegIssue={isRegIssue}
          >
          </ProtectedRoute>
          <Route path="/signin">
            <Login
              onSubmit={handleSigninSubmit}
              isRegIssue={isRegIssue}
              onClose={closeNotices}
            />
          </Route>
          <Route path="/signup">
            <Register
              onSubmit={handleSignupSubmit}
              isRegSuccess={isRegSuccess}
              isRegIssue={isRegIssue}
              onClose={closeNotices}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <NavPanel
        onClose={closeNavPanel}
        isOpen={isNavPanelOpen}
      />
      <Footer />
    </section>
  );
}

export default App;
