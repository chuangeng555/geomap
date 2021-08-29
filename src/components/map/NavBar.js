import React, {useState} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Content from './Content';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: ''
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => option.summary,
});

export default function PrimarySearchAppBar({showSearch, toggleSearchOpen, locationList, zoomToLocationFromSideBar}) {

  const [searchList, setSearchList] = useState([]);

  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [selectedData, setSelectedData] = useState({});
  const [openContent, setOpenContent] = useState(false);
  const [contentValue, setContentValue] = useState({});
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // const [locationPopup, setLocationPopup] = useState(false);
  // const [selectedSideBarLocation, setSelectedSideBarLocation] = useState(null);


  React.useEffect(() => {

    // console.log(user, isAuthenticated)
    setSearchList(locationList.map((m) => {
      // console.log(m.locationName)
      let dataList = m.locationData
      dataList.map((d) => d.locationName = m.locationName)
      return dataList
    }).flat(1))
  }, [locationList])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  const toggleSearch = () => {
    if (showSearch === true) { 
        toggleSearchOpen(false)
    } else {
        toggleSearchOpen(true)
    }
  }


  const closeContent = () => {
    setOpenContent(false)
  }



  const passDataToContentPage = (selectedValue) => {
    
    if (selectedValue) {
      setContentValue(selectedValue)
      setOpenContent(true)
    }
  }

  const zoomToLocation = (location) => {
    // console.log(location)
    zoomToLocationFromSideBar({lat: location.geoLocation[0], lng: location.geoLocation[1], data: location})

    // setSelectedSideBarLocation(location)
    // setLocationPopup(true);

    //open up the location popup 

  }
  
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h5" style={{marginLeft: '5%', marginTop: '2%'}}>
        Location Lists
      </Typography>
      <List>
      {locationList.map((text, index) => (
          <ListItem button key={text.locationName} onClick={() => zoomToLocation(text)}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text.locationName}/>
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >

          {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}/>
          {/* <Button>{anchor}</Button> */}
          <Drawer
          classes={{paper: classes.paper}} 
          anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
          </IconButton>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Reviews
          </Typography> */}
          <div className={classes.search}>
            <Autocomplete
            id="filter-demo"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            options={searchList}
            // onSelect={(e) => console.log(e.target.value)}
            onChange={(event, selectedValue) => passDataToContentPage(selectedValue)}
            getOptionLabel={(option) => option.summary}
            filterOptions={filterOptions}
            style={{ width: 300 }}
            renderInput={(params) => 
            <> 
              <
                TextField {...params} label={
                <>
              <div className={classes.searchIcon}>
                <SearchIcon />
                Search Reviews
              </div> 
            </>
            } variant="outlined" />
            </>
            }
            />
          </div>

          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge> */}
                  {
                    isAuthenticated ?
                    <>
                    <Button onClick={toggleSearch} 
                    variant="contained"
                    color="primary"> Add Review </Button>
                    {" "}
                    </>        
                    
                    : "" 
                }
            </IconButton>

            {
                isAuthenticated ? 
                <IconButton
                edge="end"
                // aria-label="account of current user"
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                onClick={() =>
                  logout({
                    returnTo: window.location.origin,
                  })}
                color="inherit"
            >
                <ExitToAppIcon />
                {/* <AccountCircle /> */}
            </IconButton> : ""
            }

          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {openContent ? <Content closeContent={closeContent} 
      location={contentValue.locationName} 
      summary={contentValue.summary}
      description={contentValue.description}
      date={contentValue.create_date}
      imageurl={contentValue.imageUrl}
      /> : null }

    </div>
  );
}
