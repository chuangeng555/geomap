

//import { Account } from "./components/auth/Account";
import Map from "./components/map/Usermap";
//import Status from "./components/auth/Status";
import Login from './components/auth/Login'; 
//import ChangePassword from './components/auth/ChangePassword';
//import { map } from "leaflet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div>
        <Router>
          <Switch>
          <Route path="/" exact component={Map}></Route>
          </Switch>
          <Switch>
          <Route path="/login" exact component={Login}></Route>
          </Switch>
          <Switch>
          {/*<Route path="/changePassword" exact component={ChangePassword}></Route>*/}
          </Switch>
        </Router>
    </div>
  );
}

export default App;
