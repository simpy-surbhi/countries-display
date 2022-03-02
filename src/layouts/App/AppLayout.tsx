import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { getRoutes } from "./routes";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
  },
}));

interface Props {
  toggleDarkTheme: () => void;
}

export const AppLayout: React.FC<Props> = ({ toggleDarkTheme }) => {
  const classes = useStyles();
  const routes = getRoutes();
  return (
    <React.Fragment>
      <Header toggleDarkTheme={toggleDarkTheme} />

      <main
        className={classes.main}
        style={{
          marginLeft: 0,
        }}
      >
        {routes && (
          <Switch>
            {routes.map(
              ({ component: Component, render, ...routeProps }, index) => (
                <Route
                  {...routeProps}
                  key={index.toString()}
                  render={(componentProps) => (
                    <React.Fragment>
                      {Component ? (
                        <Component {...componentProps} />
                      ) : render ? (
                        render(componentProps)
                      ) : null}
                    </React.Fragment>
                  )}
                />
              )
            )}
            <Route
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            ></Route>
          </Switch>
        )}
      </main>
    </React.Fragment>
  );
};
