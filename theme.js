'use client';
import { createTheme } from '@mui/material/styles';
import './app/globals.css'

const font = "'Open Sans', sans-serif"
const theme = createTheme({
  typography: {
    fontFamily: font
  },
  palette:{
    text:{}
  }
});

export default theme;
