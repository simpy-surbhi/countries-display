import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { Country } from "../models";
import { useParams } from "react-router";
import { useApiClient } from "../hooks";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Link } from "react-router-dom";

interface Params {
  countryName: string;
}
export const CountryInfo: React.FC = () => {
  const classes = useStyles();
  const { countryName } = useParams<Params>();
  const [{ data, loading }] = useApiClient<Country[]>(`/name/${countryName}`);
  const borderCodes = Array.isArray(data)
    ? data[0].borders?.toString()
    : undefined;
  const [{ data: borderCountries, loading: borderLoading }] = useApiClient<
    Country[]
  >(`/alpha/?codes=${borderCodes}`);
  const borderNames = Array.isArray(borderCountries)
    ? borderCountries.map((m) => m.name)
    : [];

  return (
    <React.Fragment>
      <div className={classes.body}>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          component={Link}
          to="/"
        >
          Back
        </Button>
        {(loading || borderLoading) && <LinearProgress />}
        {!Array.isArray(data) && !(loading || borderLoading) && (
          <Typography
            variant="h4"
            className={classes.countryTitle}
            color="error"
          >
            No country found!
          </Typography>
        )}

        {Array.isArray(data) && data.length > 0 && (
          <Grid container justifyContent="space-between">
            <Grid item lg={5} xs={12} className={classes.grid}>
              <Card>
                <CardMedia
                  className={classes.infoMedia}
                  image={data[0].flag}
                  title={data[0].name}
                />
              </Card>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.grid}>
              <Typography variant="h2" className={classes.countryTitle}>
                {data[0].name}
              </Typography>

              <Grid container className={classes.gridContainer}>
                <Grid item lg={6} xs={12}>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Native Name:</strong> {data[0].nativeName}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Population: </strong>
                    {data[0].population.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Region: </strong>
                    {data[0].region}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Sub Region: </strong>
                    {data[0].subregion}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Capital: </strong>
                    {data[0].capital}
                  </Typography>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Top Level Domain: </strong>
                    {data[0].topLevelDomain}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Currencies: </strong>
                    {data[0].currencies.map((m, index) =>
                      index !== data[0].currencies.length - 1
                        ? m.name + ", "
                        : m.name
                    )}
                  </Typography>
                  <Typography variant="body1" className={classes.detailElement}>
                    <strong>Languages: </strong>
                    {data[0].languages.map((m, index) =>
                      index !== data[0].languages.length - 1
                        ? m.name + ", "
                        : m.name
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.gridContainer}>
                <Grid item lg={3} xs={12} className={classes.gridContainer}>
                  <Typography variant="body1">
                    <strong>Border Countries: </strong>
                  </Typography>
                </Grid>
                <Grid item lg={9} xs={12}>
                  {borderNames?.map((b, index) => {
                    return (
                      <Button
                        key={index.toString()}
                        variant="outlined"
                        className={classes.borderButton}
                        component={Link}
                        to={`/country/${b}`}
                      >
                        {b}
                      </Button>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
};
