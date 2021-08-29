import React, {useState, useEffect}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import S3 from "react-aws-s3"; 
import Upload from '../upload/Upload'

const db = process.env.REACT_APP_DB;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID, 
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY 
}


export default function FormDialog({closeForm, data}) {
  const [disabledButton, setDisabledButton] = useState(true);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const [tempFile, settempFile] = useState('') 
  const [tempFileName, settempFileName] = useState('')
  const [showTempFile, setshowTempFile] = useState('')

  const handleSubmit = () => {
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(tempFile, tempFileName).then((res) => {
      console.log(res)
      //console.log(res.location) // store in db for the url  
      if (res.status === 204){
          //console.log('success')
          //console.log(data._id)

      axios.patch(db + '/locations/' + data._id, {
        "description": description,
        "summary" : summary,
        "imageUrl": res.location
      }).then((response) => {
        //console.log(response)
        handleClose()
        // window.location.reload(false);
      }).catch((error) => {
        console.log(error)
      })

  } else {
    //console.log('fail')
    return 'fail'
  }
  })


  }


  const handleClose = () => {
    //setOpen(false);
    closeForm(false)
  };

  
  useEffect(() => {

    if (summary.length === 0 || description.length === 0 || tempFileName.length === 0) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }, [summary, description, tempFileName])


  const sendFileName = (value) => {
    settempFileName(value)
  }

  const sendFile = (value) => {
    settempFile(value)
    setshowTempFile(URL.createObjectURL(value))
  }



  return (
    <div>
      <Dialog open={true} onClose={() => {handleClose();}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Fill in Review for :</DialogTitle>
        <DialogTitle id="form-dialog-title"><h4>{data.locationName}</h4></DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          id="outlined-full-width"
          label="Title"
          //placeholder="Placeholder"
          fullWidth
          margin="normal"
          value={summary}
          onChange={e => {setSummary(e.target.value)}}
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
            value={description} 
            onChange={e => {setDescription(e.target.value)}}
          />

      <Upload sendFile={sendFile} sendFileName={sendFileName} />


      {showTempFile ? 
          <img src={showTempFile} alt="" 
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {handleSubmit();}} disabled={disabledButton} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}