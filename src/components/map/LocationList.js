import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DataGrid } from '@material-ui/data-grid';
import { useAuth0 } from "@auth0/auth0-react";
import Content from './Content';
import axios from "axios";
const db = process.env.REACT_APP_DB;

const columns = [
  { field: 'summary', headerName: 'Summary',  width: 350 },
  { field: 'create_date', headerName: 'Date Created', width: 240 }
];


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const {locationData, id } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDetailsBoolean, setOpenDetailsBoolean] = useState(false)
  const [dataArray, setDataArray] = useState(null)
  const [openContent, setOpenContent] = useState(false)
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [payload, setPayload] = useState({})
  const [selectedData, setselectedData] = useState([])
  const [isViewButtonDisabled, setisViewButtonDisabled] = useState(true)
  const [isDeleteButtonDisabled, setisDeleteButtonDisabled] = useState(true)
  const { isAuthenticated } = useAuth0();


  const [imageurl, setImageUrl] = useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setisViewButtonDisabled(true)
  };

  const deleteContent = () => {

    if (dataArray.length <= 1 || dataArray.length === selectedData.length) { //if less than 1 
      //console.log(id)
      axios.delete(db + '/locations/' + id).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })     
    } else {
      let filteredListID = selectedData.map((s) => s.id)

      axios.patch(db + '/locations/deleteInnerIds/' + id, {
        list: filteredListID
      }).then((res) => console.log(res)).catch((error) => console.log(error))
    }
    setisViewButtonDisabled(true)
    setisDeleteButtonDisabled(true)
    window.location.reload(false);
  }

  const deleteLocation = () => { 
    axios.delete(db + '/locations/' + id).then((response) => {
      //console.log(response)
    }).catch((error) => {
      console.log(error)
    })  
    window.location.reload(false);
  }


  useEffect(() => {
    const dateFormat = (date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1 ;
        let year = date.getFullYear();
      
        let hrs = date.getHours();
        
        let mins = date.getMinutes();
        
        const ampm = hrs >= 12 ? 'pm' : 'am';
        
        hrs %= 12; //to get the num of pm or am 
        
        hrs = hrs || 12; //to tackle 0000 hrs problem 
        
        mins = mins < 10 ? `0${mins}` : mins;
      
        const strTime = `${day}/${month}/${year} ${hrs}:${mins} ${ampm}`;
        
        return (strTime);
      
      }


    const templocationData = locationData.locationData

    const output = [...templocationData.map((item) => {

        var date = new Date(item.create_date);
        
        return {
            id: item._id,
            summary: item.summary,
            imageUrl: item.imageUrl,
            description: item.description,
            create_date: dateFormat(date)
        }
    })]


    setOpenDetailsBoolean(true) 
    setDataArray(output)

}, [locationData.locationData])

  const viewReviewContent = (e) => {
    //console.log(e)
    setOpenContent(true)

    setSummary(e.row.summary)
    setDescription(e.row.description)
    setDate(e.row.create_date)
    setImageUrl(e.row.imageUrl)
  }

  const closeContent = (e) => {
    setOpenContent(false)
    setisViewButtonDisabled(true)
  }

  const onSelected = (e) => {
    setPayload(e)
    setisViewButtonDisabled(false)
  }

  return (
    <>
      <Button variant="outlined" color="primary" style={{margin: "2px"}} onClick={handleClickOpen}>
        Review lists
      </Button> 
      {isAuthenticated ? 
      <Button variant="outlined" color="secondary" onClick={deleteLocation} style={{margin: "2px"}}>
        Delete Location
      </Button> : "" }  
      
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth={true} style={{margin: "2px"}}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {locationData.locationName}
            </Typography>
            <Typography align="right">
              <Button disabled={isViewButtonDisabled} color="primary" variant="contained" onClick={() => viewReviewContent(payload)}>View Review</Button>
            </Typography>

            {isAuthenticated ? 
            <Typography align="right">
              <Button disabled={isDeleteButtonDisabled} color="secondary" variant="contained" onClick={deleteContent}>Delete Data</Button>
            </Typography> : "" }
          </Toolbar>
        </AppBar>
        {dataArray?
            <div id="datapopup" className="popup">
                <div style={{ height: 400, width: '100%' }}>
                    {openDetailsBoolean ? 
                    
                    <DataGrid checkboxSelection={isAuthenticated} disableSelectionOnClick onRowClick={(e) => {onSelected(e);}} style={{width: '200%'}} rows={dataArray} columns={columns}  pageSize={5} rowsPerPageOptions={[5, 10]} disableColumnMenu={true} 
                    onSelectionModelChange={(e) => {
                      const selectedIDs = new Set(e.selectionModel);
                      const selectedRowData = dataArray.filter((row) =>
                        selectedIDs.has(row.id.toString())
                      )
                      if (selectedRowData.length !== 0) 
                      {setselectedData(selectedRowData); setisDeleteButtonDisabled(false)} else {
                        setisDeleteButtonDisabled(true) 
                      }
                    }}
                    /> : ""}
                </div>
            </div> : "" }
      </Dialog>

      {openContent ? <Content closeContent={closeContent} 
      location={locationData.locationName} 
      summary={summary}
      description={description}
      date={date}
      imageurl={imageurl}
      /> : null }
    </>
  );
}