import { Link } from "react-router-dom";

function NotFound() {
  return (
      <section className="page-not-found">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <Link className="subtitle-link subtitle-link_not-found" to={"/"}>Назад</Link>
      </section>
  );
}

export default NotFound;
