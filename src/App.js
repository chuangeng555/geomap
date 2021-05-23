//import logo from "./logo.svg";
import "./App.css";
import Map from "./components/map/Usermap";

import LocationDetail from "./components/map/LocationDetail";

//import { map } from "leaflet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <Map />
      </header>*/}
      <Router>
      <Switch>
      <Route path="/" exact component={Map}></Route>
      <Route path="/content/:root_id/:inner_id" component={LocationDetail}></Route>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
