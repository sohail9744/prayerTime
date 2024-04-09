import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function TimeCard({ Time }) {
  const [remain, setRemainTime] = useState({});
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Find the prayer time for FAJR
      const fajrTime = Time.prayerTimes.find(
        (prayer) => prayer.name === Time.nextPrayerTime.key
      ).azaanTime;

      // Split the time string by either ':' or ' '
      const [time, modifier] = fajrTime.split(" ");
      const [hours, minutes, seconds] = time.split(":");

      // Current date and time
      const now = new Date();

      // Create a Date object for the Fajr prayer time on the current date
      const fajrDate = new Date(now);
      // Adjust hours for AM/PM
      const hoursAdjusted =
        modifier === "PM" ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12;
      fajrDate.setHours(hoursAdjusted, parseInt(minutes), parseInt(seconds));

      // If the Fajr prayer time has already passed for today, adjust to the next day
      if (fajrDate <= now) {
        fajrDate.setDate(fajrDate.getDate() + 1);
      }

      // Calculate the difference in milliseconds
      const diff = fajrDate - now;

      // Convert milliseconds into hours, minutes, and seconds
      const diffHours = Math.floor(diff / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diff / (1000 * 60)) % 60);
      const diffSeconds = Math.floor((diff / 1000) % 60);

      setRemainTime({
        diffHours,
        diffMinutes,
        diffSeconds,
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box my={3} display="flex" gap={2} component="main">
      <Typography variant="h1">-</Typography>
      <Box display={'flex'} justifyItems={'center'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h1">{remain.diffHours}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            width: "auto",
            px: 5
          }}
        >
          <Typography>Hours</Typography>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h1">:</Typography>
      </Box>
      <Box display={'flex'} justifyItems={'center'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h1">{remain.diffMinutes}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            width: "auto",
            px: 5
          }}
        >
          <Typography>Minutes</Typography>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h1">:</Typography>
      </Box>
      <Box display={'flex'} justifyItems={'center'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h1">{remain.diffSeconds}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            px: 5
          }}
        >
          <Typography>Seconds</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default TimeCard;
