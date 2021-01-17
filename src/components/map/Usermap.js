import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import 'leaflet-draw/dist/leaflet.draw.css';
import './style.css';
import { Map, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { VenueLocationIcon }  from './VenueLocationIcon';
import FormPopup from './Popup.js';
import Search from './Search.js';
import ExistingMarkers from './ExistingMarkers';

const default_query = "revenue";


const db = process.env.REACT_APP_DB;


export class Usermap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 1.3521, lng: 103.8198 },
            zoom: 12,
            showPopup: false,
            showSearch: false,
            showMarkerCreatedForm: false,
            searchTerm: default_query,
            result: null,
            showTempMarker: false,
            tempMarkerPosition: [],
            markerDescription: null, 
            createdMarkerPositon: null, 
            dbGeoData: [],
            descriptionChange: null, 
        }
    }

    onSearchChange = (event) => {
        let { searchTerm } = this.state; 
        this.setState({ searchTerm: event.target.value });
        axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${searchTerm}&returnGeom=Y&getAddrDetails=Y&pageNum=1`).then((response) => {
            this.displayTopQuery(response.data.results);    
        })
    }

    displayTopQuery = (result) => {
        //console.log(result)
        this.setState({result})
    }


    _onCreated = (e) => {
        //pass geo json here 
        //console.log(e.layer._latlng)
        if (e.layerType === 'marker') {
            console.log(e.layer._latlng);
            this.setState({
                showPopup: true,
                createdMarkerPositon: e.layer._latlng,
                showMarkerCreatedForm: true
            })
        }
    }

    togglePopupClose = () => {  
        let { showPopup } = this.state;
        window.location.reload();
        
        showPopup ?  
        this.setState({  //to set state 
             showPopup: false, //Opposite of default if click --> showPopup : True  
             showTempMarker: false
        }) : this.setState({  //to set state 
            showPopup: true  //Opposite of default if click --> showPopup : True  
       }) 
    }
    

    togglePopupOpen = () => {
        this.setState({showPopup: true})

    }

    toggleSearchOpen = () => {
        let { showSearch } = this.state; 
        if (showSearch === true) { 
            this.setState({showSearch: false})
        } else {
            this.setState({showSearch: true})
        }
    }

    toggleSearchClose = () => {
        window.location.reload();
        this.setState({showSearch: false})
    }

    searchSubmit = (val) =>  {
        //console.log(val.item);
        this.setState({
            showSearch: false,
            currentLocation: { lat: val.item.LATITUDE, lng: val.item.LONGITUDE},
            zoom: 20,
            showTempMarker: true,
            tempMarkerPosition: [val.item.LATITUDE, val.item.LONGITUDE],
            showPopup: true,
            tempMarkerInfo: val.item.SEARCHVAL,
        });
    }

    componentDidMount() {
        const { searchTerm} = this.state; 
        //console.log(searchTerm);
        axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${searchTerm}&returnGeom=Y&getAddrDetails=Y&pageNum=1`).then((res) => {
            this.displayTopQuery(res.data.results);    
        })


        //db
        axios.get(db).then((res) => {
            //console.log(res.data)
            this.setState({
                dbGeoData: res.data.data
            })
        })
    }

    onDescriptionChange = (event) => { 
        //console.log(event.target.value)
        this.setState({descriptionChange: event.target.value})
      }




    render () {
        
        const {currentLocation, zoom, searchTerm, result, tempMarkerPosition, tempMarkerInfo, markerDescription, createdMarkerPositon} = this.state;
        //const position = [1.3521, 103.8198]

        return (
        <div>
            <Map className="map" center={currentLocation} zoom={zoom}> 
            <button className="searchBar" onClick={this.toggleSearchOpen}> Search </button>
            
            {this.state.showSearch ? 
            <Search
            className = "searchBar"
            value={searchTerm}
            list = {result}
            onChange={this.onSearchChange}
            onClick = {this.toggleSearchClose}
            onSubmit = {this.searchSubmit}
            />
            : null }

            {this.state.showPopup && this.state.createdMarkerPositon ?
            // created from marker   
             <FormPopup onClick={this.togglePopupClose} createdMarker= {createdMarkerPositon}/> :
             // created from search bar  
             this.state.showPopup ? 
             <FormPopup onClick={this.togglePopupClose} nameValue={tempMarkerInfo} descriptionValue={markerDescription} createdMarker= {createdMarkerPositon} tempMarkerPosition={tempMarkerPosition} />  : null } 


            {/*temporary b4 parse to database --> for show only... */}
            {this.state.showTempMarker ? 
            <Marker position={tempMarkerPosition} icon={VenueLocationIcon} >
            </Marker>
            : null }

            {this.state.dbGeoData ? <ExistingMarkers geo_venues={this.state.dbGeoData} /> : null}


            <TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
                    <FeatureGroup>
						<EditControl
                        position='topleft'
						onEdited={this._onEdited}
						onCreated={this._onCreated}
                        // onDeleted={this._onDeleted}
                        // onDeleteStart = {this._onDeleteStart}
						draw={{
						rectangle: false,
						// marker:  {
                        //     icon: VenueLocationIcon
                        // },
                        marker: false,
                        circle: false,
						polyline: false,
                        circlemarker: false,
                        remove: false,
                        polygon: false,
						}}
                        edit={{
                            edit: false,
                            remove: false,
                        }}
						/>
					</FeatureGroup>
            </Map>
        </div> 
        )

    }
}




export default Usermap;
