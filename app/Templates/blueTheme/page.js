'use client'
import {
  Box,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TimeCard from "../ThemeComponents/time_card";
import PrayerTimeCards from "../ThemeComponents/prayertime_card";
import { getCurrentPrayerTimes } from "../../components/PrayerTime";

const font = "'Montserrat', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    text: {},
    primary: {
      main: "#00a76f",
    },
    secondary: {
      main: "#ffff",
    },
  },
});
function DefaultTheme() {
  const [updateKey, setUpdateKey] = useState(0);
  const [prayerTimes, setPrayerTimesData] = useState(null);
  const formatTime = (timeString) => {
    const [time, format] = timeString.split(" "); // Split by space to separate time from AM/PM
    const [hours, minutes] = time.split(":"); // Split by colon to separate hours and minutes
    return { time: `${hours}:${minutes}`, format };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentPrayerTimes();
        const newData = data?.prayerTimes.map((item) => {
          return {
            ...item,
            azaanTime: formatTime(item.azaanTime),
            jamatTime: formatTime(item.jamatTime),
          };
        });
        const obj = {
          ...data,
          newData,
        };
        setPrayerTimesData(obj);
        console.log("how many times it's updated", updateKey);
      } catch (error) {
        console.error("Error fetching prayer times and day:", error);
      }
    };
    // Set up an interval to increment updateKey every minute
    fetchData();
  }, [updateKey]);

  return (
    <ThemeProvider theme={theme}>
      <Box component="body" bgcolor="primary.main" height={"100vh"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "58%",
          }}
          aria-label="call to prayer box"
        >
          <Typography variant="h3">{`THE CALL TO PRAYER ${prayerTimes?.nextPrayerTime.key} IN`}</Typography>
          {prayerTimes ? <TimeCard Time={prayerTimes} /> : null}
        </Box>
        {/* Bottom part start from here */}
        <Box
          display={"flex"}
          gap={1}
          bgcolor={"#10273f"}
          component="main"
          height="42%"
          padding={1}
        >
          {prayerTimes ? <PrayerTimeCards Time={prayerTimes} /> : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DefaultTheme;
