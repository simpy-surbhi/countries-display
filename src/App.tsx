import { AppLayout } from "./layouts";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

interface Props {}

interface CustomState {
  isDark: boolean;
}

export default class App extends React.Component<Props, CustomState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDark: false,
    };
  }

  public render() {
    const customTheme = createTheme({
      palette: {
        type: this.state.isDark ? "dark" : "light",
      },
    });

    const toggleDarkTheme = () => {
      this.setState({ isDark: !this.state.isDark });
    };

    return (
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppLayout toggleDarkTheme={toggleDarkTheme} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
