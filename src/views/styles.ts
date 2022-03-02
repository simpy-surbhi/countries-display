import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  body: {
    padding: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(8),
    },
  },

  mainBody: {
    padding: theme.spacing(0, 5),
  },

  cardMedia: {
    aspectRatio: "1.5",
    borderBottom: "1px solid theme.palette.text.disabled",
  },

  mainGridContainer: {
    padding: theme.spacing(3.7),
  },

  bodyGridContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(4, 9, 2, 9),
    },
  },

  optionsGrid: {
    [theme.breakpoints.up("xs")]: {
      padding: theme.spacing(2, 0),
    },
  },

  errorGrid: {
    padding: theme.spacing(3.7),
    textAlign: "center",
  },

  infoMedia: {
    aspectRatio: "1.5",
  },

  borderButton: {
    margin: theme.spacing(2, 1.2, 0, 0),
    padding: theme.spacing(0, 2.5),
  },

  grid: {
    marginTop: theme.spacing(5),
  },

  countryTitle: {
    fontWeight: "bold",
    marginTop: theme.spacing(5),
  },

  gridContainer: {
    paddingTop: theme.spacing(2.5),
  },

  detailElement: {
    padding: theme.spacing(0.6, 0),
  },
}));
