import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  console.log(props);

  return (
    <Route>
      {props.loggedIn ? <Component {...props} /> : <Redirect to="/" />}
    </Route>
  );
}

export default ProtectedRoute;
