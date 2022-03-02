import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";

interface Props {
  toggleDarkTheme: () => void;
}

export const Header: React.FC<Props> = ({ toggleDarkTheme }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>
            Where in the world?
          </Typography>
          <Button
            className={classes.button}
            startIcon={<NightsStayOutlinedIcon />}
            onClick={toggleDarkTheme}
          >
            Dark Mode
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
