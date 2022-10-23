function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="section-title">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__info">
          <p className="main-title main__title_about-me">Илья</p>
          <p className="about-me__job">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__text">Я  живу в Новосибирске, закончил факультет ИВТ СибГУТИ. Я люблю слушать музыку, а ещё увлекаюсь футболом. Недавно начал кодить. С 2013 года работал в IT сфере.
            После того, как прошёл курс по веб-разработке в 2022, нахожусь в поиске постоянной работы.</p>
          <a href="https://github.com/Ilya-Bikmetov" className="about-me__hub">Github</a>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;
