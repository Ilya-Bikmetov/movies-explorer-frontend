import { useState } from 'react';

function SearchForm({ onSubmit, setPreloaderState, isSwitcherOn, handleSwitcher }) {
  const [inputData, setInputData] = useState({ movie: '' });

  const changeSwitchCondition = () => handleSwitcher(!isSwitcherOn);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  }

  const submitSearch = (e) => {
    e.preventDefault();
    setPreloaderState(true);
    onSubmit({ movie: inputData.movie });
  }



  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-logo" />
        <form onSubmit={submitSearch} className="form-movies">
          <input
            className="search-form__input"
            name="movie"
            placeholder="Фильм"
            type="movie"
            required
            onChange={handleInputChange}
            value={inputData.movie}
          />
          <button className="search-form__button" type="submit" aria-label="Поиск фильмов" />
          <div className="search-form__separator" />
          <button onClick={changeSwitchCondition} className={`switcher ${isSwitcherOn && 'switcher_on'}`} type="button" aria-label="Переключатель">
            <div className="switcher__circle" />
          </button>
          <p className="search-form__text">Короткометражки</p>
        </form>
      </div>
      <div className="search-form__swtich-container">
        <button onClick={changeSwitchCondition} className={`switcher switcher_mobile ${isSwitcherOn && 'switcher_on'}`} type="button" aria-label="Переключатель">
          <div className="switcher__circle" />
        </button>
        <p className="search-form__text search-form__text_mobile">Короткометражки</p>
      </div>
      <div className="search-form__line" />
    </section>
  );
}

export default SearchForm;
