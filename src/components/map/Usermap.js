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
        }
    }


    componentDidMount() {
        
    }

    _onCreated = (e) => {
        console.log(e)
        this.setState({
            showPopup: true,
        })
    } 

    togglePopup = () => {  
        this.setState({  //to set state 
             showPopup: false  //Opposite of default if click --> showPopup : True  
        });  
    }


    render () {


        const {currentLocation, zoom } = this.state;
        return (
        <div>
            <Map className="map" center={currentLocation} zoom={zoom}>
            {this.state.showPopup ? <Popup closePopup={this.togglePopup}  />  : null }
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


export default Usermap;