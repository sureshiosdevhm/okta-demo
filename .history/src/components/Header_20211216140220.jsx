import React, { useState, useEffect } from "react";
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
  logTitle,
  headerTitle = "Hi There! Welcome.",
}) {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [showLoader, setShowLoader] = useState(false);
  const [title, setTitle] = useState("Hi There! Welcome.");

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setTitle("Hi There! Welcome.");
    } else {
      oktaAuth.getUser().then((info) => {
        console.log(info);
        //setTitle(info);
      });
    }
  }, [authState, oktaAuth]);

  function handleLogin() {
    setShowLoader(true);
    oktaAuth.signInWithRedirect({ originalUri: "/profile" });
    setShowLoader(false);
  }

  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const handleLogout = async () => {
    setShowLoader(true);
    const basename =
      window.location.origin + history.createHref({ pathname: "/" });
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
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
            {authState && authState.isAuthenticated ? "Name" : { title }}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              authState && authState.isAuthenticated
                ? handleLogout()
                : handleLogin();
            }}
          >
            {authState && authState.isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>{showLoader && <LinearProgress />}</Box>
    </Box>
  );
}
