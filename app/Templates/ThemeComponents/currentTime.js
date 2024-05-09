import { Paper, Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function CurrentTiming({ Time }) {
  const currDate = moment().format("MMMM Do YYYY");
  const [time, setTime] = useState({
    time: moment().tz(Time?.timeZone).format("hh:mm"),
    format: moment().tz(Time?.timeZone).format("A").toUpperCase(),
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime({
        time: moment().tz(Time?.timeZone).format("hh:mm"),
        format: moment().tz(Time?.timeZone).format("A").toUpperCase(),
      });
    }, 60000);
    return () => clearInterval(intervalId);
  }, [Time]);
  return (
    <Paper
      component={"div"}
      aria-label="wraper"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: '#1A2980',
        color: "secondary.main",
        fontWeight: "600",
        width: '355px'
      }}
    >
      <Box display={"flex"} alignItems={"baseline"} gap={"2px"}>
        <Typography textTransform={"capitalize"} variant="h2">
          {time.time}
        </Typography>
        <Typography variant="h5">{time.format}</Typography>
      </Box>
      <Typography variant="h6">{currDate}</Typography>
    </Paper>
  );
}
