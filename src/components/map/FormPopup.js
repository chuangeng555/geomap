import {React, Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
require('dotenv').config()


const db = process.env.REACT_APP_DB;
//const db = 'https://0ihrzn8o0k.execute-api.ap-southeast-1.amazonaws.com/final'


export default class FormPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        markerName: props.nameValue,
        markerDescription: '',
        markerSummary: '',
        open: false
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
    console.log(e)
    console.log(this.props.tempMarkerPosition.toString())

    axios.get(db + "/locations/geo/" + this.props.tempMarkerPosition.toString()).then((response) => {

      if (response.data.data.length === 0 ) { //if nvr exist b4 
        //post req
        console.log(response.data)
        axios.post(db + "/locations", {
          "locationName": this.state.markerName,
          "geoLocation": this.props.tempMarkerPosition,
            "locationData": {
            "description": this.state.markerDescription,
              "summary" : this.state.markerSummary
            }
          }).then(function (response) {
            console.log(response);
            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error);
          });

      } else {
        //if exist b4, append to id

        let id = response.data.data[0]._id;

        //console.log(id);

        axios.patch(db + '/locations/' + id, {
          "description": this.state.markerDescription,
          "summary" : this.state.markerSummary
        }).then((response) => {
          console.log(response)
          window.location.reload(false);
        }).catch((error) => {
          console.log(error)
        })
      }
      
    });
  }



  render() {

    const { onClick } = this.props; //onChange

    return (
      <div>
      <Dialog open={true} onClose={onClick} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Fill in Review for :</DialogTitle>
        <DialogTitle id="form-dialog-title"><h4>{this.state.markerName}</h4></DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          id="outlined-full-width"
          label="Title"
          //placeholder="Placeholder"
          fullWidth
          margin="dense"
          value={this.state.markerSummary}
          onChange={e => {this.onSummaryChange(e)}}
          //InputLabelProps={{
          //  shrink: true,
          //}}
          //variant="outlined"
        />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review Description"
            multiline
            fullWidth
            rows={6}
            value={this.state.markerDescription} 
            onChange={e => {this.onDescriptionChange(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick} color="primary">
            Cancel
          </Button>
          <Button onClick={this.postDetails} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      //<div className="popup">
      //  <div>
      //    <Button
      //      id="close"
      //      variant="contained"
      //      color="secondary"
      //      type="submit"
      //      onClick={onClick}
      //    >
      //      X
      //    </Button>
      //    <form className="form" onSubmit={this.postDetails}>
      //    {/*onChange={e => {this.onLocationNameChange(e)}}*/}
      //      <h3>{this.state.markerName}</h3>
      //      <input type="hidden" name="name" value={this.state.markerName}/>
      //      Summary : <textarea id="summary" value={this.state.markerSummary} onChange={e => {this.onSummaryChange(e)}} ></textarea>
      //      Description : <textarea id="description" value={this.state.markerDescription} onChange={e => {this.onDescriptionChange(e)}} ></textarea>
      //      {/*<input color="primary" variant="contained" type="submit" value="Submit" />*/}
      //      {/*<Button color="primary" variant="contained">Submit</Button> */}
      //      <input type="submit" value="Submit" />
      //    </form>
      //    </div>
      //</div>  
    );
    
  }

}
