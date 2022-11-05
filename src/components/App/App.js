import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Promo from "../Promo/Promo.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Navigation from '../Navigation/Navigation.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import NavPanel from '../NavPanel/NavPanel.js';
import * as Movies from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
function App() {
  let moviesSaved = [];
  const [cards, setCards] = useState([]);
  const [isPreloaderOn, setPreloaderState] = useState(false);
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);
  const [isShortMoviesOn, setShortMoviesSwitcher] = useState(false);

  const closeNavPanel = () => setNavPanelOpen(false);
  const openNavPanel = () => setNavPanelOpen(true);
  const getCurrentCards = () => JSON.parse(localStorage.getItem('moviesFound'));

  const handleShortMoviesSwitcher = (state) => {
    setShortMoviesSwitcher(state);
    if (state) {
      const currentCards = getCurrentCards();
      const shortMovieCards = currentCards.filter((card) => card.duration <= 40);
      setCards(shortMovieCards.reverse());
    } else {
      setCards(getCurrentCards().reverse());
    }
  };

  const getMovies = async () => {
    const movies = await Movies.getContent();
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  const findMovies = ({ movie }) => {
    let movieSame = false;
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
      }
    } else {
      console.log('Этот фильм уже добавлен');
    }
    setPreloaderState(false);
  }

  const renderCards = () => {
    if (typeof (localStorage.moviesFound) !== 'undefined') {
      setCards(getCurrentCards().reverse());
    }
  }

  useEffect(() => {
    getMovies();
    renderCards();
  }, []);
  return (
    <section className="page">
      <Header />
      <div>
        <Switch>
          <Route exact path="/">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </Route>
          <Route path="/movies">
            <Navigation
              onOpen={openNavPanel}
            />
            <SearchForm
              onSubmit={findMovies}
              setPreloaderState={setPreloaderState}
              isSwitcherOn={isShortMoviesOn}
              handleSwitcher={handleShortMoviesSwitcher}

            />
            <Preloader
              isOn={isPreloaderOn}
            />
            <MoviesCardList
              cards={cards}
              isOn={isPreloaderOn}
            />
          </Route>
          <Route path="/saved-movies">
            <Navigation
              onOpen={openNavPanel}
            />
            <SearchForm
              onSubmit={findMovies}
              setPreloaderState={setPreloaderState}
              isSwitcherOn={isShortMoviesOn}
              handleSwitcher={handleShortMoviesSwitcher}
            />
            <MoviesCardList />
          </Route>
          <Route path="/profile">
            <Navigation
              onOpen={openNavPanel}
            />
            <Profile />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <NavPanel
          onClose={closeNavPanel}
          isOpen={isNavPanelOpen}
        />
      </div>
      <Footer />
    </section>
  );
}

export default App;
