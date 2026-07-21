import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A5C36", // Dark green
      light: "#3E8E5E",
      dark: "#003312",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFB800", // Yellow-orange for buttons and badge
      contrastText: "#212121",
    },
    background: {
      default: "#F5F7FA", // Light gray for background
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "2rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
