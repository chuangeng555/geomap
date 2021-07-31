import React, {useState} from 'react';
import {Popup} from 'react-leaflet';
import Button from "@material-ui/core/Button";
import LocationForm from './LocationForm';
import LocationList from "./LocationList";
import { useAuth0 } from "@auth0/auth0-react";

require('dotenv').config()

const MarkerPopup = (props) => {
  const [formStatus, openFormStatus] = useState(false); 
  const { data } = props;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  //buttonState

  const closeForm = () => {
    openFormStatus(false)
  }

  return  (
  <Popup className="popup-marker" onClose = {() => { openFormStatus(false) }}>
    <div className='popup-text'>
      {data.locationName}    
      {"  "}
        <br/>
        <br/> 
        <LocationList locationData={data} id={data._id} />

        <br />
        {
          isAuthenticated ? 
          <Button onClick={() => { openFormStatus(true)} }  variant="outlined" color="secondary"> Add more details on this location ? </Button>
          : "" }
        {formStatus ? 
        <LocationForm closeForm={closeForm} data={data} /> : null }
      </div>
  </Popup>
  );
};

export default MarkerPopup;
