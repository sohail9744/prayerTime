'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PrayerTheme from './pages/prayerTheme';
import { LinearProgress } from '@mui/material';
import { Typography } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import './globals.css'
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Adjust the delay as needed

    // Clean up
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {!isLoaded && <Box className='YES' style={{ zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#968b8b8f' }}>
        <CircularProgress size={50} color="secondary" />
      </Box>
      }
      {isLoaded && <PrayerTheme />}
    </Box>
  );
}
