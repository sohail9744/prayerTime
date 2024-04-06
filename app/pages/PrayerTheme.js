'use client'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@emotion/styled';
import moment from 'moment/moment';
import { getCurrentPrayerTimes } from '../components/PrayerTime';
import '../style/prayerTheme.css' 

const Item = styled(Typography)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.h5,
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation: '0',
  fontFamily: 'revert-layer',
  fontWeight: '600',
  fontSize: '37px'
}));


export default function PrayerTheme() {
  const [time, setTime] = useState(null)
  const [prayerTimes, setPrayerTimesData] = useState(null);
  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime)
  }
  setInterval(updateTime, 1000)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentPrayerTimes();
        setPrayerTimesData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching prayer times and day:', error);
      }
    };

    fetchData();
  }, []);
  // const prayerTimes = [
  //   { name: 'FAJR', time: '5:00 AM' },
  //   { name: 'ZUHR', time: '12:00 PM' },
  //   { name: 'ASR', time: '3:30 PM' },
  //   { name: 'MAGHRIB', time: '6:00 PM' },
  //   { name: 'ISHA', time: '7:30 PM' }
  // ];

  return (
    <Box class="page-theme" component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 5, m: 1, border: '1px dashed grey' }}>
      {prayerTimes && (
        <Box component="div" sx={{ width: '100%', display: 'flex', alignItems: "center", flexDirection: 'column', gap: 7 }}>
          <Stack useFlexGap alignItems="center" spacing={3}>
            <Typography variant='h5' sx={{ fontWeight: '600' }}>Location: Riyadh</Typography>
            <Typography variant='h1'>{time}</Typography>
          </Stack>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={prayerTimes?.currentDay}
            row
          >
            <FormControlLabel sx={{ fontSize: '43px' }} value="Mon" control={<Radio />} label="Mon" />
            <FormControlLabel value="Tue" control={<Radio />} label="Tue" />
            <FormControlLabel value="Wed" control={<Radio />} label="Wed" />
            <FormControlLabel value="Thus" control={<Radio />} label="Thus" />
            <FormControlLabel value="Fri" control={<Radio />} label="Fri" />
            <FormControlLabel value="Sat" control={<Radio />} label="Sat" />
            <FormControlLabel value="Sun" control={<Radio />} label="Sun" />
          </RadioGroup>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography variant='h4' sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}>Salah Time</Typography>
              <Stack sx={{ width: '-webkit-fill-available' }} spacing={3}>
                {prayerTimes.prayerTimes.map((prayer, index) => (
                  <Grid key={index} sx={{ width: '-webkit-fill-available' }} container>
                    <Grid xs={5}>
                      <Item elevation={3}>{prayer.name}</Item>
                    </Grid><Grid xs={1}>
                      <Item elevation={0}>:</Item>
                    </Grid><Grid xs={5}>
                      <Item elevation={0}>{prayer.time}</Item>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography variant='h4' sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}>Azan Time</Typography>
              <Stack sx={{ width: '-webkit-fill-available' }} spacing={3}>
                {prayerTimes.azaanTimes.map((prayer, index) => (
                  <Grid key={index} sx={{ width: '-webkit-fill-available' }} container>
                    <Grid xs={5}>
                      <Item elevation={3}>{prayer.name}</Item>
                    </Grid><Grid xs={1}>
                      <Item elevation={0}>:</Item>
                    </Grid><Grid xs={5}>
                      <Item elevation={0}>{prayer.time}</Item>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}