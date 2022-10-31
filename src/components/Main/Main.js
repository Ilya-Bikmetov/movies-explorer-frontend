import { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js";
import Techs from "./Techs/Techs.js";
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js";
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Navigation from '../Navigation/Navigation.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import NavPanel from '../NavPanel/NavPanel.js';
// import Preloader from '../Preloader/Preloader.js';

function Main() {
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);

  const closeNavPanel = () => setNavPanelOpen(false);
  const openNavPanel = () => setNavPanelOpen(true);
  return (
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
          <SearchForm />
          {/* <Preloader /> */}
          <MoviesCardList />
        </Route>
        <Route path="/saved-movies">
          <Navigation
            onOpen={openNavPanel}
          />
          <SearchForm />
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
  );
}

export default Main;
