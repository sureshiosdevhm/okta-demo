import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import Header from "./../components/Header";
import { Typography } from "@mui/material";

const Home = () => {
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
