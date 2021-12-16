import * as React from "react";
import {
  LinearProgress,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

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
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Box>
  );
}
