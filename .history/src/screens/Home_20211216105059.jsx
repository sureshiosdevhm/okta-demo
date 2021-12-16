import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import Header from "./../components/Header";
import { Typography } from "@mui/material";
import { login, logout } from "./../features/authentication/authSlice.js";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth.loginBtnTitle);
  const dispatch = useDispatch();
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  function login() {
    oktaAuth.signInWithRedirect({ originalUri: "/profile" });
    dispatch(login());
  }

  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const logout = async () => {
    const basename =
      window.location.origin + history.createHref({ pathname: "/" });
    dispatch(logout());
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

  // return (
  //   <div>
  //     {!authState.isAuthenticated ? (
  //       <Header onClick={login} logTitle="Login" />
  //     ) : (
  //       <Header onClick={logout} logTitle="Logout" />
  //     )}
  //     {!authState && <h6>Loading Authentication....</h6>}
  //   </div>
  // );

  if (!authState) {
    return (
      <>
        <Header onClick={login} logTitle="Login" />
        <Typography>Fetching details...</Typography>
      </>
    );
  } else {
    return (
      <>
        {!authState.isAuthenticated ? (
          <>
            <Header onClick={login} logTitle="Login" />
            <Typography>Welcome! Please Login</Typography>
          </>
        ) : (
          <Header onClick={logout} logTitle="Logout" />
        )}
      </>
    );
  }
};
export default Home;
