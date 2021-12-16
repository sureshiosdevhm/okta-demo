import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header({ onClick, logTitle }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hi There! Welcome.
          </Typography>
          <Button color="inherit" onClick={onClick}>
            {logTitle}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
