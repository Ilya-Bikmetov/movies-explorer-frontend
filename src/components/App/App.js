import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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

function App() {
  const [cards, setCards] = useState([]);
  const [cardsLiked, setCardsLiked] = useState([]);
  const [isPreloaderOn, setPreloaderState] = useState(true);
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);
  const [isShortMoviesOn, setShortMoviesSwitcher] = useState(false);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isRegIssue, setRegIssue] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', id: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFindMessageOn, setFindMessage] = useState({ state: false, message: '' });
  const history = useHistory();
  const location = useLocation();

  const closeNavPanel = () => setNavPanelOpen(false);
  const openNavPanel = () => setNavPanelOpen(true);
  const getCurrentCards = () => JSON.parse(localStorage.getItem('moviesFound'));
  const getCurrentLikedCards = () => JSON.parse(localStorage.getItem('moviesLiked'));
  const closeNotices = () => {
    isRegSuccess && setRegSuccess(false);
    isRegIssue && setRegIssue(false);
  }
  const handleShortMoviesSwitcher = (state) => {
    if (state === true) {
      const shortMovieLikedCards = getCurrentLikedCards().filter((card) => card.duration <= 40);
      const shortMovieCards = getCurrentCards().filter((card) => card.duration <= 40);
      setCards(shortMovieCards.reverse());
      setCardsLiked(shortMovieLikedCards);
      localStorage.setItem('shortMoviesSwitcher', JSON.stringify(true));
      setShortMoviesSwitcher(state);
    } else {
      if (typeof (localStorage.moviesFound) !== 'undefined') {
        setCards(getCurrentCards().reverse());
        setCardsLiked(getCurrentLikedCards);
        localStorage.setItem('shortMoviesSwitcher', JSON.stringify(false));
        setShortMoviesSwitcher(state);
      }
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
    let moviesSaved = [];
    let movieSame = false;
    setFindMessage(false);
    const moviesLoaded = JSON.parse(localStorage.getItem('movies'));
    if (typeof (localStorage.moviesFound) !== 'undefined') {
      moviesSaved = JSON.parse(localStorage.getItem('moviesFound'));
      movieSame = moviesSaved.some((item) => item.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()))
    }
    if (!movieSame) {
      const moviesFound = moviesLoaded.filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()));
      moviesFound.forEach((item) => moviesSaved.push(item))
      if (moviesFound.length > 0) {
        localStorage.setItem('moviesFound', JSON.stringify(moviesSaved));
        setCards(moviesSaved.reverse());
      } else {
        setFindMessage({ state: true, message: 'Ничего не найдено' });
      }
    } else {
      setFindMessage({ state: true, message: 'По этому запросу фильмы уже добавлены' });
    }
    setPreloaderState(false);
  }

  const findSavedMovies = ({ movie }) => {
    const moviesSavedFound = JSON.parse(localStorage.getItem('moviesLiked')).filter(obj => obj.nameRU.replace(/ /g, '').toLowerCase().includes(movie.replace(/ /g, '').toLowerCase()));
    setCardsLiked(moviesSavedFound);
    setPreloaderState(false);
  }

  const renderCards = () => {
    if (typeof (localStorage.moviesFound) !== 'undefined') {
      setPreloaderState(false);
      setCards(getCurrentCards().reverse());
    }
  }

  const handleSignupSubmit = async ({ name, email, password }) => {
    try {
      await MainApi.signup({ name, email, password });
      setRegSuccess(true);
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
      setPreloaderState(true);
    } catch (err) {
      console.log(err);
      setRegIssue(true);
    }
  }

  const handleSignout = async () => {
    try {
      await MainApi.clearJwtCookie();
      localStorage.setItem('jwt', false);
      setLoggedIn(false);
      localStorage.removeItem('moviesFound');
      setCards([]);
      setCardsLiked([]);
      setFindMessage({ state: false, message: '' });
      window.removeEventListener('resize', handleCardsRender);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditProfile = async ({ name, email }) => {
    try {
      await MainApi.editProfile({ name, email });
      setCurrentUser({ name, email });
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

  const handleBtnMore = () => {

  }

  const handleCardsRender = () => {
    if (window.innerWidth > 1280) {
      // console.log('Ширина больше 1280px');


    }
    if (window.innerWidth > 769 && window.innerWidth < 1280)
      console.log('Ширина меньше 1280px');
    if (window.innerWidth > 480 && window.innerWidth < 768)
      console.log('Ширина меньше 768px');
    if (window.innerWidth < 480)
      console.log('Ширина меньше 480px');
  }

  useEffect(() => {
    if (loggedIn) {
      getMovies();
      renderCards();
      getContent();
      getLikedMoviesApi();
      history.push('movies');
      handleShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
      setShortMoviesSwitcher(JSON.parse(localStorage.getItem('shortMoviesSwitcher')));
    }
  }, [loggedIn, history]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCardsLiked(JSON.parse(localStorage.getItem('moviesLiked')).reverse());
    }
  }, [location])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt === 'true') {
      setLoggedIn(true);
      window.addEventListener('resize', handleCardsRender);
    }
  }, []);


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
            handleLike={handleLike}
            cardsLiked={cardsLiked}
            setCardsLiked={setCardsLiked}
            onSumbitSaved={findSavedMovies}
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
