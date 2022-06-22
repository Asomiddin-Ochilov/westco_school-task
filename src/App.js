import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SingUp";
import ErrorPage from "./Components/ErrorsPage";
import Pages from "./Pages";
import UserPage from "./Pages/UserPage";
import AdminPage from './Pages/AdminPage/index';
function App() {
  return (
    <div className="app">
      <Switch>
        <Route path={"/"} component={Pages} exact />
        <Route path={"/login"} component={Login} />
        <Route path={"/singup"} component={SignUp} />
        <Route path={"/errors"} component={ErrorPage} />
        <Route path={"/user/:id"} component={UserPage} />
        <Route path={"/admin/:id"} component={AdminPage} />
        <Redirect to={"/errors"} />
      </Switch>
    </div>
  );
}

export default App;
