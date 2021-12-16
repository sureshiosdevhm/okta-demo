import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  const profile = () => <Link to="/profile" />;

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
