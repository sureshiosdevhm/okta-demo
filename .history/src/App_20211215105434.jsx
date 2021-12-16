import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./Home";
import Locked from "./Locked";
import Profile from "./Profile";
import { oktaConfig } from "./lib/oktaConfig";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    //history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
    navigate(originalUri, { replace: "/" });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" exact element={Home} />
        <Route path={CALLBACK_PATH} exact element={LoginCallback} />
        <SecureRoute path="/locked" exact element={Locked} />
        <SecureRoute path="/profile" element={Profile} />
      </Routes>
    </Security>
  );
};

export default App;
