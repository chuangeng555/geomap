import React, {useState} from 'react';
import {Popup} from 'react-leaflet';
import Button from "@material-ui/core/Button";
import LocationDetailsList from "./LocationDetailsList";
import axios from "axios";
require('dotenv').config()



const db = process.env.REACT_APP_DB;


const MarkerPopup = (props) => {
  const [openInfo, setOpenInfo] = useState(false) //for popup purposes
  const [formStatus, openFormStatus] = useState(false);
  const [disableButton, setDisableButton] = useState(false);  
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const { data, buttonState } = props;

  const handleSubmit = (e) => {

    axios.patch(db + '/' + data._id, {
      "description": description,
      "summary" : summary
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }


  return  (
  <Popup className="popup-marker" onClose = {() => {setOpenInfo(false); setDisableButton(false); openFormStatus(false) }}>
    <div className='popup-text'>{data.locationName}    

    <Button
				id="marker-view-data-button"
				variant="contained"
				color="secondary"
        disabled={disableButton ? disableButton : buttonState}
        onClick = {() => {setOpenInfo(true); setDisableButton(true); }}
				>
				View Data
				</Button>
        {openInfo ? <LocationDetailsList locationData={data} /> : null}
        {openInfo ? <button onClick={() => { setOpenInfo(false) ; openFormStatus(true)} } > Add more details on this location ? </button> : null}

        {formStatus ? 
        <div id="datapopup" className="popup" onSubmit={handleSubmit}>
          <form className="markerForm">
            <input type="hidden" name = "id" value = {data._id} /> 
            Summary : <input type="input" name="name" id="marker-summary" value={summary} onChange={e => {setSummary(e.target.value)}} />
            Description <textarea id="marker-description" value={description} onChange={e => {setDescription(e.target.value)}} ></textarea>
            <input type="submit" value="Submit" />
          </form>
          
        </div>
        : null} 
      </div>
  </Popup>);

};

export default MarkerPopup;
