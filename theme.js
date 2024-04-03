'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', "sans-serif"].join(","),
  },
});

export default theme;
