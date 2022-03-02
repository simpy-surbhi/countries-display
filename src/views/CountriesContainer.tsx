import {
  Grid,
  TextField,
  IconButton,
  Card,
  CardActionArea,
  LinearProgress,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./styles";
import { Autocomplete } from "@material-ui/lab";
import { useApiClient } from "../hooks";
import { Country } from "../models";
import { useDebounce } from "use-debounce/lib";
import { Link } from "react-router-dom";

enum Regions {
  AFRICA = "Africa",
  AMERICAS = "Americas",
  ASIA = "Asia",
  EUROPE = "Europe",
  OEANIA = "Oceania",
}
export const CountriesContainer: React.FC = () => {
  const classes = useStyles();
  const [{ data, loading }] = useApiClient<Country[]>(`/all`);
  const [searchText, setSearchText] = React.useState<string>("");
  const [regionValue, setRegionValue] = React.useState<Regions | null>();
  const [displayData, setDisplayData] = React.useState<Country[]>();

  const variables = React.useMemo(
    () => ({
      searchText: searchText,
    }),
    [searchText]
  );

  const [searchTextValue] = useDebounce(variables.searchText, 1000);

  const [{ data: searchData, loading: searchLoading }] = useApiClient<
    Country[]
  >(`/name/${searchTextValue}`);

  const [{ data: regionData, loading: regionLoading }] = useApiClient<
    Country[]
  >(`/region/${regionValue}`);

  React.useEffect(() => {
    if (searchTextValue && searchTextValue?.length > 0) {
      !Array.isArray(searchData)
        ? setDisplayData([])
        : setDisplayData(searchData);
      return;
    }
    if (regionValue) {
      !Array.isArray(regionData)
        ? setDisplayData([])
        : setDisplayData(regionData);
      return;
    }
    if (data) {
      setDisplayData(data);
    }
  }, [data, searchData, searchTextValue, regionValue, regionData]);

  const regions: Regions[] = [
    Regions.AFRICA,
    Regions.AMERICAS,
    Regions.ASIA,
    Regions.EUROPE,
    Regions.OEANIA,
  ];
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-between"
        className={classes.bodyGridContainer}
      >
        <Grid item md={4} xs={12} className={classes.optionsGrid}>
          <TextField
            fullWidth
            id="standard-bare"
            variant="outlined"
            placeholder="Search for a country..."
            value={searchText}
            onChange={(e) => {
              setRegionValue(null);
              setSearchText(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid item md={2} xs={6} className={classes.optionsGrid}>
          <Autocomplete
            value={regionValue ?? null}
            options={regions}
            getOptionLabel={(l) => l}
            onChange={(e, val) => {
              setSearchText("");
              setRegionValue(val);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="clubId"
                variant="outlined"
                placeholder="Filter by Region"
              />
            )}
          />
        </Grid>
      </Grid>
      <div className={classes.mainBody}>
        {(loading || searchLoading || regionLoading) && <LinearProgress />}
        <Grid container>
          {displayData &&
            displayData.length === 0 &&
            !(loading || searchLoading || regionLoading) && (
              <Grid item xs={12} className={classes.errorGrid}>
                <Typography gutterBottom variant="h4" color="error">
                  No country found!
                </Typography>
              </Grid>
            )}

          {displayData?.map((country, index) => {
            return (
              <Grid
                item
                lg={3}
                xs={12}
                key={index.toString()}
                className={classes.mainGridContainer}
              >
                <Card>
                  <CardActionArea
                    component={Link}
                    to={`/country/${country.name}`}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={country.flag}
                      title={country.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {country.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Population: </strong>
                        {country.population.toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Region: </strong>
                        {country.region}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Capital: </strong>
                        {country.capital}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
};
