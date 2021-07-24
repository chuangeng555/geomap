import React, {useState, useEffect}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const db = process.env.REACT_APP_DB;


export default function FormDialog({closeForm, data}) {
  const [disabledButton, setDisabledButton] = useState(true);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    axios.patch(db + '/locations/' + data._id, {
      "description": description,
      "summary" : summary
    }).then((response) => {
      //console.log(response)
      handleClose()
      window.location.reload(false);
    }).catch((error) => {
      //console.log(error)
    })
  }

  const handleClose = () => {
    //setOpen(false);
    closeForm(false)
  };

  
  useEffect(() => {

    if (summary.length === 0 || description.length === 0) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }, [summary, description])

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