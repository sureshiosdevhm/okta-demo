import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  const profile = () => history.push("/profile");

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  } else {
    return profile;
  }
};
export default Home;
