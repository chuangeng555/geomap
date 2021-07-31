// src/components/logout-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
        className="search"
        variant="contained"
        color="secondary"
    //  className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;