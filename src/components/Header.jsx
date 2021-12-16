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

export default function Header() {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [showLoader, setShowLoader] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setTitle("Welcome,");
    } else {
      oktaAuth.getUser().then((info) => {
        const name = `Welcome, ${info.given_name} ${info.family_name}!`;
        setTitle(name);
      });
    }
  }, [authState, oktaAuth]);

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: "/profile" });
    setShowLoader(false);
  };

  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const handleLogout = async () => {
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

  if (!authState) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setShowLoader(true);
              history.push("/");
              setShowLoader(false);
            }}
          >
            Home
          </Button>
          {authState.isAuthenticated && (
            <Button
              color="inherit"
              onClick={() => {
                setShowLoader(true);
                history.push("/profile");
                setShowLoader(false);
              }}
            >
              Profile
            </Button>
          )}
          <Button
            color="inherit"
            onClick={() => {
              setShowLoader(true);
              history.push("/payment");
              setShowLoader(false);
            }}
          >
            Payment
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              setShowLoader(true);
              authState.isAuthenticated ? handleLogout() : handleLogin();
            }}
          >
            {authState.isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>{showLoader && <LinearProgress />}</Box>
    </Box>
  );
}
