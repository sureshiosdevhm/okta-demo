import { Typography } from "@mui/material";
import Header from "./../components/Header";

function Payment() {
  return (
    <>
      <Header />
      <Typography sx={{ textAlign: "center", mt: 2 }}>
        You are in Payment Section!
      </Typography>
    </>
  );
}

export default Payment;
