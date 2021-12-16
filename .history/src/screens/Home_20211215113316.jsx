import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import { toRelativeUrl } from "@okta/okta-auth-js";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  const logout = () => oktaAuth.signOut;

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  } else {
    <div>
      <button onClick={logout}>Login</button>
    </div>;
  }
};
export default Home;
