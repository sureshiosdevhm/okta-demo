// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const ISSUER =
//   process.env.ISSUER || "https://{yourOktaDomain}.com/oauth2/default";
// const OKTA_TESTING_DISABLEHTTPSCHECK =
//   process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
// const BASENAME = process.env.PUBLIC_URL || "";
// const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

// export default {
//   oidc: {
//     clientId: CLIENT_ID,
//     issuer: ISSUER,
//     redirectUri: REDIRECT_URI,
//     scopes: ["openid", "profile", "email"],
//     pkce: true,
//     disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
//   },
//   resourceServer: {
//     messagesUrl: "http://localhost:8000/api/messages",
//   },
//   app: {
//     basename: BASENAME,
//   },
// };

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const REACT_APP_PORT = process.env.REACT_APP_PORT;

export const oktaConfig = {
  clientId: `${REACT_APP_CLIENT_ID}`,
  issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `http://localhost:${REACT_APP_PORT}/`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
