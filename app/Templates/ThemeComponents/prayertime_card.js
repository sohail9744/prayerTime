import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";

function PrayerTimeCards({ Time }) {
  // console.log("bhai agyea data", Time);
  const currDate = moment().format("MMMM Do YYYY");

  const [time, setTime] = useState({
    time: moment().format("0h:mm"),
    format: moment().format("a").toUpperCase(),
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime({
        time: moment().format("h:mm"),
        format: moment().format("a").toUpperCase(),
      });
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Paper
        component={"div"}
        aria-label="wraper"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "inherit",
          color: "secondary.main",
          fontWeight: "600",
        }}
      >
        <Box mx={4} display={"flex"} alignItems={"baseline"} gap={"2px"}>
          <Typography textTransform={"capitalize"} variant="h2">
            {time.time}
          </Typography>
          <Typography variant="h5">{time.format}</Typography>
        </Box>
        <Typography variant="h6">{currDate}</Typography>
      </Paper>
      {Time &&
        Time?.newData.map((PrayerTime, index) => (
          <Paper
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "3px",
              flex: 1,
              color:
                Time.nextPrayerTime?.key === PrayerTime.name
                  ? ""
                  : "secondary.main",
              bgcolor:
                Time.nextPrayerTime?.key === PrayerTime.name ? "" : "inherit",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              component={"div"}
              aria-label="wraper"
              mx={2}
              gap={1}
            >
              <Box display={"flex"} alignItems={"baseline"} gap={"2px"}>
                <Typography textTransform={"capitalize"} variant="h3">
                  {PrayerTime?.azaanTime.time}
                </Typography>
                <Typography variant="h5">
                  {" "}
                  {PrayerTime?.azaanTime.format}
                </Typography>
              </Box>
              <Typography variant="h4">{PrayerTime.name}</Typography>
              <Box display={"flex"} alignItems={"baseline"} gap={"2px"}>
                <Typography textTransform={"capitalize"} variant="h3">
                  {PrayerTime?.jamatTime.time}
                </Typography>
                <Typography variant="h5">
                  {PrayerTime?.jamatTime.format}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
    </>
  );
}

export default PrayerTimeCards;
