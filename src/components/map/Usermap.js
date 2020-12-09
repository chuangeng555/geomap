import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import './style.css';
import { Map, TileLayer, FeatureGroup, Marker} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { VenueLocationIcon }  from './VenueLocationIcon';
import Popup from './Popup.js';

class Usermap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 1.3521, lng: 103.8198 },
            zoom: 12,
            showPopup: false,
            showSearch: false,
            searchTerm: " ",
        }
    }


    onSearchSubmit = () => {
        const { searchTerm } = this.state;
        this.fetchSearchTopLocation(searchTerm);
      }

    onSearchChange = (event) => {
        console.log(event.target.value);
        this.setState({ searchTerm: event.target.value });
      }

    fetchSearchTopLocation = (searchTerm) => {

    } 

    _onCreated = (e) => {
        console.log(e)
        //pass geo json here 


        this.setState({
            showPopup: true,
        })
    }

    togglePopupClose = () => {  
        this.setState({  //to set state 
             showPopup: false  //Opposite of default if click --> showPopup : True  
        });  
    }

    togglePopupOpen = () => {
        this.setState({showPopup: true})
    }

    toggleSearchOpen = () => {
        this.setState({showSearch: true})
    }


    componentDidMount() {
        
    }

    render () {
        
        const {currentLocation, zoom, searchTerm} = this.state;
        return (
        <div>
            <Map className="map" center={currentLocation} zoom={zoom}> 
            <button className="searchBar" onClick={this.toggleSearchOpen}> Search </button>
            
            {this.state.showSearch ?
            <Search
            className = "searchBar"
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            ></Search>
            : null }

            {this.state.showPopup ?
             <Popup closePopup={this.togglePopupClose}  /> 
              : null }
            <TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
                    <FeatureGroup>
						<EditControl
						position='topleft'
						onEdited={this._onEdited}
						onCreated={this._onCreated}
						onDeleted={this._onDeleted}
						draw={{
						rectangle: false,
						marker:  {
                            icon: VenueLocationIcon
                        },
						circle: false,
						polyline: false,
						circlemarker: false
						}}
						/>
					</FeatureGroup>
            </Map>
        </div> 
        )

    }
}


const Search = ({ value, onChange }) => (
    <div className="popup"> 
    <form>
      Serach {" "}
      <input type="text" value={value} onChange={onChange} />
    </form>
    </div>
  );


export default Usermap;