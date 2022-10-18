function Promo() {
  return (
    <div className="promo">
      <div className="promo__titles">
        <h1 className="promo__title">Учебный проект студента факультета<br />Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a
          href="#about-title"
          className='promo__btn'
        >Узнать больше</a>
      </div>
      <div className='promo__logo' />
    </div>
  );
}

export default Promo;
