import {React, Component} from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
require('dotenv').config()

const db = "http://localhost:8080/api/v1/locations";

export default class FormPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        markerName: props.nameValue,
        markerDescription: null, 
      }
  }


      
  onLocationNameChange = (event) => { 
    this.setState({markerName: event.target.value})
  }

  onDescriptionChange = (event) => { 
    this.setState({markerDescription: event.target.value})
  }

  postDetails = (e) => {
    axios.post(db, {
    "locationName": this.state.markerName,
    "description": this.state.markerDescription,
    "geoLocation": this.props.tempMarkerPosition
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  componentDidMount(){
  }

  render() {

    const { onClick , createdMarker} = this.props; //onChange



    return (
      <div className="popup">
        <Button
          id="close"
          variant="contained"
          color="secondary"
          type="submit"
          onClick={onClick}
        >
          X
        </Button>
        <form className="form" onSubmit={this.postDetails}>
          Name of location: <input type="text" name="name" value={this.state.markerName} onChange={e => {this.onLocationNameChange(e)}}/>
          {/*onChange={onChange}*/}
          Description : <textarea id="description" value={this.state.markerDescription} onChange={e => {this.onDescriptionChange(e)}} ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>  
    );
    
  }

}
