import { useState } from 'react';

function SearchForm() {
  const [isSwitchOn, setSwitchCondition] = useState(false);

  const changeSwitchCondition = () => {
    if (isSwitchOn) {
      setSwitchCondition(false);
    }else {
      setSwitchCondition(true);
    }
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-logo" />
        <form className="form-movies">
          <input
            className="search-form__input"
            name="Фильм"
            placeholder="Фильм"
            required
          />
          <button className="search-form__button" type="submit" aria-label="Поиск фильмов" />
          <div className="search-form__separator" />
          <button onClick={changeSwitchCondition} className={`switcher ${isSwitchOn && 'switcher_on'}`} type="button" aria-label="Переключатель">
            <div className="switcher__circle" />
          </button>
          <p className="search-form__text">Короткометражки</p>
        </form>
      </div>
      <div className="search-form__swtich-container">
        <button className="switcher switcher_mobile" type="button" aria-label="Переключатель">
          <div className="switcher__circle" />
        </button>
        <p className="search-form__text search-form__text_mobile">Короткометражки</p>
      </div>
      <div className="search-form__line" />
    </section>
  );
}

export default SearchForm;
