import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import 'leaflet-draw/dist/leaflet.draw.css';
import './style.css';
import "../../App.css";
import { Map, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { VenueLocationIcon }  from './VenueLocationIcon';
import FormPopup from './FormPopup.js';
import Search from './Search.js';

import ExistingMarkers from './ExistingMarkers';
import Button from "@material-ui/core/Button";
import { blue  } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import NavBar from './NavBar.js'; 
import Container from "@material-ui/core/Container";


const default_query = "revenue";


const db = process.env.REACT_APP_DB;
//const db = 'https://0ihrzn8o0k.execute-api.ap-southeast-1.amazonaws.com/final'



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
            openMenu: false,
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
            //console.log(e.layer._latlng);
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

    toggleSearchOpen = (value) => {
        this.setState({showSearch: value})
        //let { showSearch } = this.state; 
        //if (showSearch === true) { 
        //    this.setState({showSearch: false})
        //} else {
        //    this.setState({showSearch: true})
        //}
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
        axios.get(db + '/locations').then((res) => {
            this.setState({
                dbGeoData: res.data.data
                
            })
        })
    }

    onDescriptionChange = (event) => { 
        //console.log(event.target.value)
        this.setState({descriptionChange: event.target.value})
    }

    clickMenu = (event) => {
        if (this.openMenu) {
            this.setState ({
                openMenu: false
            })
        } else {
            this.setState ({
                openMenu: true 
            })
        }
    }

    zoomToLocationFromSideBar = (value) => {
        this.setState({
            currentLocation: { lat: value.lat, lng: value.lng},
            zoom: 30, 
        })
    }




    render () {
        
        const {currentLocation, zoom, searchTerm, result, tempMarkerPosition, tempMarkerInfo, markerDescription, createdMarkerPositon} = this.state;
        //const position = [1.3521, 103.8198]

        return (
        <>      
            <NavBar className="appBar" zoomToLocationFromSideBar={this.zoomToLocationFromSideBar} toggleSearchOpen={this.toggleSearchOpen} showSearch={this.state.showSearch} locationList={this.state.dbGeoData}/>    

            <Container >    
            
            <Map className="map App" center={currentLocation} zoom={zoom} zoomControl={false}> 

            {/*<Button className="search" onClick={this.toggleSearchOpen} 
            variant="contained"
			color="primary"> Search </Button>*/}

            
            {this.state.showSearch ? 
            <Search
            className = "searchBar"
            value={searchTerm}
            list = {result}
            parentOpen={this.state.showSearch}
            onChange={this.onSearchChange}
            onClick = {this.toggleSearchClose}
            onSubmit = {this.searchSubmit}
            />
            : null }

            {this.state.showPopup && this.state.createdMarkerPositon ?
            
            <FormPopup onClick={this.togglePopupClose} createdMarker= {createdMarkerPositon}/> :

            this.state.showPopup ?  <FormPopup onClick={this.togglePopupClose} nameValue={tempMarkerInfo} descriptionValue={markerDescription} createdMarker= {createdMarkerPositon} tempMarkerPosition={tempMarkerPosition} />  : null }
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

            </Container>
        </> 
        )

    }
}




export default Usermap;
