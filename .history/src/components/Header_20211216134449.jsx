import React, { useState } from "react";
import {
  LinearProgress,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

export default function Header({
  onClick,
  logTitle,
  headerTitle = "Hi There! Welcome.",
}) {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [showLoader, setShowLoader] = useState(false);

  function handleLogin() {
    oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  }

  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const handleLogout = async () => {
    const basename =
      window.location.origin + history.createHref({ pathname: "/" });
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    } catch (err) {
      if (isCorsError(err)) {
        alert("CORS Error");
      } else {
        throw err;
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerTitle}
          </Typography>
          <Button color="inherit" onClick={onClick}>
            {logTitle}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>{showLoader && <LinearProgress />}</Box>
    </Box>
  );
}
