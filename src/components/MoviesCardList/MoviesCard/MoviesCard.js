function MoviesCard() {
  return (
    <li className="movie">
      <img className="movie__photo" src="https://sntat.ru/resize/750/images/uploads/news/2019/11/28/81ceea5980718472ffa6b1726b8e44e4f5f561e50ab870d88294dcde6c55.jpg" alt="фото фильма" />
      <div className="movie__sign">
        <h2 className="movie__title">33 слова о дизайне</h2>
        <button className="movie__like" type="button" aria-label="Поставить лайк" />
      </div>
      <p className="movie__duration">1ч 47м</p>
    </li>

  );
}

export default MoviesCard;
