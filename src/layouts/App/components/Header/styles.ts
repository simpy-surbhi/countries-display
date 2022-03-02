import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    transform: "unset",
    zIndex: 1,
  },

  toolBar: {
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(0, 8.8),
    },
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
  },

  button: {
    textTransform: "none",
    padding: 0,
  },
}));
