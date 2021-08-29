import {React, Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Upload from '../upload/Upload'
import axios from "axios";
import S3 from "react-aws-s3"; 

require('dotenv').config()


const db = process.env.REACT_APP_DB;
//const db = 'https://0ihrzn8o0k.execute-api.ap-southeast-1.amazonaws.com/final'

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID, 
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY 
}


export default class FormPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        markerName: props.nameValue,
        markerDescription: '',
        markerSummary: '',
        open: false,
        tempFile: '', 
        tempFileName: '', 
        showTempFile: '' 
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

  sendFile = (value) => {
    //console.log(value)
    this.setState({tempFile: value})

    this.setState({showTempFile: URL.createObjectURL(value)})
  }

  
  sendFileName = (value) => {
    //console.log(value)
    this.setState({tempFileName: value})
  }



  postDetails = (e) => {
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(this.state.tempFile, this.state.tempFileName).then((data) => {
      console.log(data.location) // store in db for the url  
      if (data.status === 204){
          //console.log('success')
          //send to db  
          //check if the location already exist data or not
          //console.log(e)
          //console.log(this.props.tempMarkerPosition.toString())

          axios.get(db + "/locations/geo/" + this.props.tempMarkerPosition.toString()).then((response) => {

            // console.log(response.data.data.length)
            if (response.data.data.length === 0 ) { //if nvr exist b4 
              //post req
              console.log(data.location)
              axios.post(db + "/locations", {
                "locationName": this.state.markerName,
                "geoLocation": this.props.tempMarkerPosition,
                  "locationData": {
                  "description": this.state.markerDescription,
                    "summary" : this.state.markerSummary, 
                    "imageUrl": data.location
                  }
                }).then(function (response) {
                  // console.log(response);
                  window.location.reload(false);
                })
                .catch(function (error) {
                  console.log(error);
                });

            } else {
              //if exist b4, append to id

              let id = response.data.data[0]._id;
              console.log(id)

              //console.log(id);

              axios.patch(db + '/locations/' + id, {
                "description": this.state.markerDescription,
                "summary" : this.state.markerSummary,
                "imageUrl": data.location
              }).then((response) => {
                // console.log(response)
                window.location.reload(false);
              }).catch((error) => {
                console.log(error)
              })
            }
            
          });
          //end 
      } else {
          //console.log('fail')
          return 'fail'
      }
  })
    
  }






  render() {

    const { onClick } = this.props; //onChange

    return (
      <>
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

          <Upload sendFile={this.sendFile} sendFileName={this.sendFileName} />

          {this.state.showTempFile ? 
          <img src={this.state.showTempFile} alt="" 
          style={{
            display: 'block', 
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%'
          }} />
          : 
          null}
          

        </DialogContent>
        <DialogActions>
          <Button onClick={onClick} color="primary">
            Cancel
          </Button>
          <Button onClick={this.postDetails} color="primary" disabled={this.state.markerDescription.length === 0 || this.state.markerSummary.length === 0
          || this.state.tempFileName === "" ? true : false }>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
    );
    
  }

}
