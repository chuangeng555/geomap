import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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

export default function Content({closeContent, imageurl, location, summary, description, date}) {
  //console.log(imageurl)
  const classes = useStyles();

  const handleClose = () => {
    closeContent(false)
  };

  //console.log(description)

  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>*/}
      <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {location}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h3" align="center" style={{marginTop: "5%"}}>
              {summary}
        </Typography>
        <br />
        <Typography variant="h5" align="center" >
            created on : {date}
        </Typography>
        <br />

        <Typography variant="h4" align="center" >
          <img src={imageurl} width="720px" height="480px" alt=""  srcset="" />
        </Typography>

        <br />
        <Typography variant="h5" align="center"  style={{whiteSpace: 'pre-line', marginBottom: '5%', marginLeft: '10%', marginRight: '10%'}}>
              {description}
        </Typography>
        {/*<List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>*/}
      </Dialog>
    </div>
  );
}