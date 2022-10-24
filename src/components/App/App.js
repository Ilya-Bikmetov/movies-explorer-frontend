import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import Profile from '../Profile/Profile.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Navigation from '../Navigation/Navigation.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import NavPanel from '../NavPanel/NavPanel.js';
// import Preloader from '../Preloader/Preloader.js';

function App() {

  const [isNavPanelOpen, setNavPanelOpen] = useState(false);

  const closeNavPanel = () => setNavPanelOpen(false);
  const openNavPanel = () => setNavPanelOpen(true);


  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Navigation
          onOpen={openNavPanel}
          />
          <SearchForm />
          {/* <Preloader /> */}
          <MoviesCardList />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Navigation
            onOpen={openNavPanel}
          />
          <SearchForm />
          <MoviesCardList />
          <Footer />
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

export default App;
