import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import CurrentTiming from "./currentTime";

function PrayerTimeCards({ Time }) {
  return (
    <>
      {Time &&
        Time?.prayerTimes.map((PrayerTime, index) => (
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
                Time?.nextPrayerTime?.key === PrayerTime?.name
                  ? ""
                  : "secondary.main",
              bgcolor:
                Time?.nextPrayerTime?.key === PrayerTime?.name ? "" : "inherit",
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
                  {PrayerTime?.azaanTime}
                </Typography>
                <Typography variant="h5">{PrayerTime?.format}</Typography>
              </Box>
              <Typography variant="h4">{PrayerTime?.name}</Typography>
              <Box display={"flex"} alignItems={"baseline"} gap={"2px"}>
                <Typography textTransform={"capitalize"} variant="h3">
                  {PrayerTime?.jamatTime}
                </Typography>
                <Typography variant="h5">{PrayerTime?.format}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
    </>
  );
}

export default PrayerTimeCards;
