'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PrayerTheme from './pages/PrayerTheme';
import './globals.css'
import ClippedDrawer from './pages/dashboard';
export default function Home() {


  return (
    <Box>
      {/* <PrayerTheme/> */}
      <ClippedDrawer/>
    </Box>
  );
}
