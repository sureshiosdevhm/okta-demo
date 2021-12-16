import { Typography } from "@mui/material";
import Header from "./../components/Header";
import Profile from "./Profile";

const Home = () => {
  return (
    <>
      <Header />
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        Welcome
      </Typography>
    </>
  );
};
export default Home;
