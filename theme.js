"use client";
import { createTheme } from "@mui/material/styles";
import "./app/globals.css";

const font = "'Open Sans', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    h5: {
      fontWeight: 600,
    },
  },
  palette: {
    text: {},
    primary: {
      main: "#00a76f",
    },
    error: {
      main: "#ff5630",
    },
  },
});

export default theme;
