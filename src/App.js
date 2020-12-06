import logo from './logo.svg';
import './App.css';
import Map from './components/map/Usermap';
import { map } from 'leaflet';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello MAP
        <Map /> 
      </header>
    </div>
  );
}

export default App;
