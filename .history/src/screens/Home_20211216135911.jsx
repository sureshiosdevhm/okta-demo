import { Typography } from "@mui/material";
import Header from "./../components/Header";

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
