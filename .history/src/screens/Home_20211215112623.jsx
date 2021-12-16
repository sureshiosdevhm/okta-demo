import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  } else {
    // alert("You already authenticated! redirected to profile page");
    history.replace("/profile");
  }
};
export default Home;
