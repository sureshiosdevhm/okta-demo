import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import Header from "./../components/Header";

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });
  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const logout = async () => {
    const basename =
      window.location.origin + history.createHref({ pathname: "/" });
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

  return (
    <>
      <Header />
    </>
  );
  // if (!authState) {
  //   return <div>Loading authentication...</div>;
  // } else if (!authState.isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={login}>Login</button>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   );
  // }
};
export default Home;
