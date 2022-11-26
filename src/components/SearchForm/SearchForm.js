import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSubmit, isSwitcherOn, handleSwitcher, onSumbitSaved, isSwitcherSavedOn, handleSwitcherSaved }) {
  const [inputData, setInputData] = useState({ movie: '' });
  const [inputDataSaved, setInputDataSaved] = useState({ movie: '' });
  const location = useLocation();

  const changeSwitchCondition = () => handleSwitcher(!isSwitcherOn);
  const changeSwitchConditionSaved = () => handleSwitcherSaved(!isSwitcherSavedOn);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  }

  const handleInputChangeSaved = (e) => {
    const { name, value } = e.target;
    setInputDataSaved({
      ...inputDataSaved,
      [name]: value
    });
  }

  const submitSearch = (e) => {
    e.preventDefault();
    onSubmit({ movie: inputData.movie });
  }

  const submitSearchSaved = (e) => {
    e.preventDefault();
    onSumbitSaved({ movie: inputDataSaved.movie });
  }

  useEffect(() => {
    if (typeof (localStorage.searchField) !== 'undefined') {
      setInputData({ movie: JSON.parse(localStorage.getItem('searchField')) });
    }
  }, [])

  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-logo" />
        <form onSubmit={
          location.pathname === "/saved-movies"
            ? submitSearchSaved
            : submitSearch
        } className="form-movies">
          <input
            className="search-form__input"
            name="movie"
            placeholder="Фильм"
            type="movie"
            required
            onChange={
              location.pathname === "/saved-movies"
                ? handleInputChangeSaved
                : handleInputChange
            }
            value={
              location.pathname === "/saved-movies"
                ? inputDataSaved.movie
                : inputData.movie
            }
          />
          <button className="search-form__button" type="submit" aria-label="Поиск фильмов" />
          <div className="search-form__separator" />
          <button onClick={
            location.pathname === "/saved-movies"
              ? changeSwitchConditionSaved
              : changeSwitchCondition
          }
            className={
              location.pathname === "/saved-movies"
                ? `switcher ${isSwitcherSavedOn && 'switcher_on'}`
                : `switcher ${isSwitcherOn && 'switcher_on'}`
            }
            type="button" aria-label="Переключатель">
            <div className="switcher__circle" />
          </button>
          <p className="search-form__text">Короткометражки</p>
        </form>
      </div>
      <div className="search-form__swtich-container">
        <button onClick={
          location.pathname === "/saved-movies"
            ? changeSwitchConditionSaved
            : changeSwitchCondition
        }
          className={
            location.pathname === "/saved-movies"
            ? `switcher switcher_mobile ${isSwitcherSavedOn && 'switcher_on'}`
            : `switcher switcher_mobile ${isSwitcherOn && 'switcher_on'}`

          }
          type="button" aria-label="Переключатель">
          <div className="switcher__circle" />
        </button>
        <p className="search-form__text search-form__text_mobile">Короткометражки</p>
      </div>
      <div className="search-form__line" />
    </section>
  );
}

export default SearchForm;
