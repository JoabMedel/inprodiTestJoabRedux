import './App.css';
import Login from './components/Login';
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, Switch} from "react-router-dom";
import RecoverPassword from "./components/recoverPassword";
import PrivateRoute from "./components/ProtectedRoute";
import PrivateRouteChangePassword from "./components/ChangePassProtected";

function App() {
  return (
    <Provider store={store}>
      <div className="Aling-App">
        <Switch>
            <Route exact path="/">
              <div className="Format-Class-Forms">
                <Login/>
              </div>
            </Route>
            <Route path="/recovery">
              <div className="Format-Class-Forms">
                <RecoverPassword/>
              </div>
            </Route>
            <Route path="/userpanel">
              <PrivateRoute/>
            </Route>
            <Route path="/ressetpassword">
              <div className="Format-Class-Forms">
                <PrivateRouteChangePassword/>
              </div>
            </Route>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
