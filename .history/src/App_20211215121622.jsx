import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./screens/Home";
import Locked from "./screens/Locked";
import Profile from "./screens/Profile";
import { oktaConfig } from "./lib/oktaConfig";
import CorsErrorModal from "./screens/CorsErrorModal";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  const [corsErrorModalOpen, setCorsErrorModalOpen] = useState(false);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <CorsErrorModal {...{ corsErrorModalOpen, setCorsErrorModalOpen }} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={CALLBACK_PATH} exact component={LoginCallback} />
        <SecureRoute path="/locked" exact component={Locked} />
        <SecureRoute path="/profile" component={Profile} />
      </Switch>
    </Security>
  );
};

export default App;

/* secure route on entire application
const App = () => { 
  return (
    <Router>
      <Security {...config} >
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/" />
        </Switch>
      </Security>
    </Router>
  );
};
*/
