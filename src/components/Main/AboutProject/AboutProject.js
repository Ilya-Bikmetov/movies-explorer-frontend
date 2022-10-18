function AboutProject() {
  return (
    <div className="about-project">
      <h3 id="about-title" className="section-title">О проекте</h3>
      <div className="about-project__subtitles">
        <div>
          <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__scale">
        <div className="about-project__cell about-project__cell_small">1 неделя</div>
        <div className="about-project__cell about-project__cell_big">4 недели</div>
      </div>
      <div className="about-project__scale about-project__scale">
        <div className="about-project__cell about-project__cell_small about-project__cell_nocolor">Back-end</div>
        <div className="about-project__cell about-project__cell_big about-project__cell_nocolor">Front-end</div>
      </div>
    </div>
  );
}

export default AboutProject;
