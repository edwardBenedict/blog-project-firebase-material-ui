import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Login from "../pages/Login";
import Main from "../pages/Main";
// import Details from "../components/details/Details";
import About from "../pages/About";
import PrivateRouter from "./PrivateRouter";

function AppRouter() {
  const [isAuth, setIsAuth] = useState(true);

  const AuthContainer = () => (
    <div>
      <PrivateRouter isAuth={isAuth} exact path="/" component={Main} />
      {/* <PrivateRouter isAuth={isAuth} path="/details" component={Details} /> */}
      <PrivateRouter isAuth={isAuth} path="/about" component={About} />
    </div>
  );

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          path="/login"
          exact
          component={() => <Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route component={AuthContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
