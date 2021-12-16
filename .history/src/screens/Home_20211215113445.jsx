import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  const logout = () => oktaAuth.signOut();

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
      <button onClick={logout}>Logout</button>
    </div>;
  }
};
export default Home;
