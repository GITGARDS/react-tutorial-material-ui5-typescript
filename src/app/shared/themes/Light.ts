import { createTheme } from "@mui/material";
import { cyan, green, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({

  palette: {
    mode: "light",
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    success: {
      main: green[600],
      dark: green[400],
      light: green[800],
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f7f6f3",
    },
  },
});
