import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import Header from "../components/Header";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        console.log(info);
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <>
        <Header onClick={login} logTitle="Login" />
        <p>Fetching user profile...</p>
      </>
    );
  }

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
    // <div>
    //   <div>
    //     <p>
    //       Below is the information from your ID token which was obtained during
    //       the &nbsp;
    //       <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
    //         PKCE Flow
    //       </a>{" "}
    //       and is now stored in local storage.
    //     </p>
    //     <p>
    //       This route is protected with the <code>&lt;SecureRoute&gt;</code>{" "}
    //       component, which will ensure that this page cannot be accessed until
    //       you have authenticated.
    //     </p>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Claim</th>
    //           <th>Value</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {Object.entries(userInfo).map((claimEntry) => {
    //           const claimName = claimEntry[0];
    //           const claimValue = claimEntry[1];
    //           const claimId = `claim-${claimName}`;
    //           return (
    //             <tr key={claimName}>
    //               <td>{claimName}</td>
    //               <td id={claimId}>{claimValue.toString()}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default Profile;
