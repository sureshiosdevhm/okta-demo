import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import Header from "./../components/Header";
import { Typography } from "@mui/material";

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
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

  if (!authState) {
    return (
      <>
        <Header onClick={handleLogin} logTitle="Login" />
        <Typography>Fetching details...</Typography>
      </>
    );
  } else {
    return (
      <>
        {!authState.isAuthenticated ? (
          <>
            <Header onClick={handleLogin} logTitle="Login" />
            <Typography>Welcome! Please Login</Typography>
          </>
        ) : (
          <Header onClick={handleLogout} logTitle="Logout" headerTitle="" />
        )}
      </>
    );
  }
};
export default Home;
