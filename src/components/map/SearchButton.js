import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton  from "../auth/Logout";

function SearchButton({showSearch, toggleSearchOpen}) {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const toggleSearch = () => {
        if (showSearch === true) { 
            toggleSearchOpen(false)
        } else {
            toggleSearchOpen(true)
        }
    }
    
  return (
    <>
    {
        isAuthenticated ?
        <>
        <Button className="search" onClick={toggleSearch} 
        variant="contained"
        color="primary"> Search </Button>
        {" "}
        <LogoutButton /> 
        </>        
        
        : "" 
    }
    </>
  );
}

export default SearchButton;
