import React, {useState} from 'react';
import {Popup} from 'react-leaflet';
import Button from "@material-ui/core/Button";
import LocationDetailsList from "./LocationDetailsList";
import axios from "axios";

require('dotenv').config()


const db = process.env.REACT_APP_DB;
//const db = 'https://0ihrzn8o0k.execute-api.ap-southeast-1.amazonaws.com/final'



const MarkerPopup = (props) => {
  const [openInfo, setOpenInfo] = useState(false) //for popup purposes
  const [formStatus, openFormStatus] = useState(false);
  const [disableButton, setDisableButton] = useState(false);  
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const { data, buttonState } = props;

  const handleSubmit = (e) => {
    axios.patch(db + '/locations/' + data._id, {
      "description": description,
      "summary" : summary
    }).then((response) => {
      //console.log(response)
    }).catch((error) => {
      //console.log(error)
    })
  }




  return  (
  <Popup className="popup-marker" onClose = {() => {setOpenInfo(false); setDisableButton(false); openFormStatus(false) }}>
    <div className='popup-text'>
      {data.locationName}    
      {"  "}
    <Button
				id="marker-view-data-button"
				variant="contained"
				color="primary"
        disabled={disableButton ? disableButton : buttonState}
        onClick = {() => {setOpenInfo(true); setDisableButton(true); }}
				>
				View Data
				</Button>

        <br/> 
        {openInfo ? <span>Click on the row to view details</span> : null}
        {openInfo ? <LocationDetailsList locationData={data} id={data._id} /> : null}
        {openInfo ? <Button onClick={() => { setOpenInfo(false) ; openFormStatus(true)} } color="primary"> Add more details on this location ? </Button> : null}

        {formStatus ? 
        //className="popup"
        <div id="datapopup"  onSubmit={handleSubmit}>
          <form className="markerForm">
            <input type="hidden" name = "id" value = {data._id} /> 
            Summary : <input type="input" name="name" id="marker-summary" value={summary} onChange={e => {setSummary(e.target.value)}} />
            Description <textarea id="marker-description" value={description} onChange={e => {setDescription(e.target.value)}} ></textarea>
            <input type="submit" value="Submit" />
            {/*<Button color="primary" variant="contained">Submit</Button> */}
          </form>
        </div>
        : null} 
      </div>
  </Popup>
  );

};

export default MarkerPopup;
