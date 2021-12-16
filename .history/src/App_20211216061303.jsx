import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./screens/Home";
import Locked from "./screens/Locked";
import Profile from "./screens/Profile";
import { oktaConfig } from "./lib/oktaConfig";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={LoginCallback} />
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

/*
import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import WHome from "./WHome";
import WLogin from "./WLogin";
import Protected from "./Protected";
import { oktaAuthConfig, oktaSignInConfig } from "./lib/oktaConfig";

const oktaAuth = new OktaAuth(oktaAuthConfig);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route path="/" exact={true} component={WHome} />
        <SecureRoute path="/protected" component={Protected} />
        <Route
          path="/login"
          render={() => <WLogin config={oktaSignInConfig} />}
        />
        <Route path="/" exact={true} component={LoginCallback} />
      </Switch>
    </Security>
  );
};
export default App;
*/
