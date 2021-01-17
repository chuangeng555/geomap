import {React, Component} from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
require('dotenv').config()


const db = process.env.REACT_APP_DB;

export default class FormPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        markerName: props.nameValue,
        markerDescription: '',
        markerSummary: '',
      }
  }

  onLocationNameChange = (event) => { 
    this.setState({markerName: event.target.value})
  }

  onDescriptionChange = (event) => { 
    this.setState({markerDescription: event.target.value})
  }

  onSummaryChange = (event) => {
    this.setState({markerSummary: event.target.value})
  }


  postDetails = (e) => {
    //check if the location already exist data or not
    
    console.log(this.props.tempMarkerPosition.toString())

    axios.get(db + "/geo/" + this.props.tempMarkerPosition.toString()).then((response) => {

      if (response.data.data.length === 0 ) {
        //post req
        axios.post(db, {
          "locationName": this.state.markerName,
          "geoLocation": this.props.tempMarkerPosition,
            "locationData": {
            "description": this.state.markerDescription,
              "summary" : this.state.markerSummary
            }
          }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      } else {
        //append to id

        let id = response.data.data[0]._id;

        //console.log(id);

        axios.patch(db + '/' + id, {
          "description": this.state.markerDescription,
          "summary" : this.state.markerSummary
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })

      }

    });

    e.preventDefault();

  }


  componentDidMount(){
  }

  render() {

    const { onClick } = this.props; //onChange

    return (
      <div className="popup">
        <div>
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
          {/*onChange={e => {this.onLocationNameChange(e)}}*/}
            <h3>{this.state.markerName}</h3>
            <input type="hidden" name="name" value={this.state.markerName}/>
            Summary : <textarea id="summary" value={this.state.markerSummary} onChange={e => {this.onSummaryChange(e)}} ></textarea>
            Description : <textarea id="description" value={this.state.markerDescription} onChange={e => {this.onDescriptionChange(e)}} ></textarea>
            <input type="submit" value="Submit" />
          </form>
          </div>
      </div>  
    );
    
  }

}
