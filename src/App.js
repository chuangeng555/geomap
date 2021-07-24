import "./App.css";
import Map from "./components/map/Usermap";


//import { map } from "leaflet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path="/" exact component={Map}></Route>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
