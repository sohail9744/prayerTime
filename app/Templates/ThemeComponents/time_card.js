import { Box, Paper, Typography } from "@mui/material";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  SunnahTimes,
} from "adhan";

function TimeCard({ Time}) {
  return (
    <Box my={3} display="flex" gap={2} component="main">
      {/* <Typography variant="h1">-</Typography> */}
      <Box
        display={"flex"}
        justifyItems={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h1">{Time?.hours}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            width: "auto",
            px: 5,
          }}
        >
          <Typography>Hours</Typography>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h1">:</Typography>
      </Box>
      <Box
        display={"flex"}
        justifyItems={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h1">{Time?.minutes}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            width: "auto",
            px: 5,
          }}
        >
          <Typography>Minutes</Typography>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h1">:</Typography>
      </Box>
      <Box
        display={"flex"}
        justifyItems={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h1">{Time?.seconds}</Typography>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            px: 5,
          }}
        >
          <Typography>Seconds</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default TimeCard;
