"use client";
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
import { getCurrentPrayerTimes } from "../../Dashboard/components/PrayerTime";
import { getSession, useSession } from "next-auth/react";
import { GetApiCall } from "../../api/apiCalls";
import moment from "moment";
import CurrentTiming from "../ThemeComponents/currentTime";
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  SunnahTimes,
} from "adhan";

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
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [stopwatchTimeout, setStopwatchTimeout] = useState(null);
  //
  const [remain, setRemainTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        try {
          const locationPrayerTime = await getCurrentPrayerTimes();
          const checkMethod = `prayer-times?&filters[user][id][$eq]=${session?.id}`;
          const { data, status } = await GetApiCall(checkMethod, session?.jwt);

          const formatingData = data.map((prayerTimes) => {
            const groupedPrayerTimes = [];
            for (const key in prayerTimes?.attributes) {
              if (key.startsWith("pray_")) {
                const prayerType = key.substring(5); // Extract prayer type
                const azaanKey = `azaan_${prayerType}`; // Azaan key corresponding to the prayer type
                if (prayerTimes?.attributes[azaanKey]) {
                  // Both Azaan and prayer times exist for this prayer type
                  let prayerObject;
                  if (prayerType !== "jumah") {
                    prayerObject = {
                      name: prayerType.toLocaleUpperCase(),
                      jamatTime: moment(prayerTimes?.attributes[key]).format(
                        "hh:mm"
                      ),
                      azaanTime: moment(
                        prayerTimes?.attributes[azaanKey]
                      ).format("hh:mm"),
                      format: moment(prayerTimes?.attributes[azaanKey])
                        .format("A")
                        .toUpperCase(),
                    };
                  } else {
                    prayerObject = {
                      name: prayerType.toLocaleUpperCase(),
                      jamatTime: moment(prayerTimes?.attributes[key]).format(
                        "hh:mm"
                      ),
                      azaanTime: moment(
                        prayerTimes?.attributes[azaanKey]
                      ).format("hh:mm"),
                      format: moment(prayerTimes?.attributes[azaanKey])
                        .format("A")
                        .toUpperCase(),
                    };
                  }
                  groupedPrayerTimes.push(prayerObject);
                }
              }
            }
            return groupedPrayerTimes;
          });
          setPrayerTimesData({
            ...locationPrayerTime,
            prayerTimes: formatingData[0],
          });
        } catch (error) {
          console.error("Error fetching prayer times and day:", error);
        }
      }

      if (!session) {
        try {
          const data = await getCurrentPrayerTimes();
          setPrayerTimesData({ ...data });
          console.log("how many times it's updated", updateKey);
        } catch (error) {
          console.error("Error fetching prayer times and day:", error);
        }
      }
    };
    fetchData();
  }, [updateKey]);

  // Clock every second it will rerender runs from here the data will go to time_card.js file

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const nextPrayerTime = await getPrayerTimings();
      // Format azaan time and current time
      const azaanTime = `${nextPrayerTime?.azaanTime} ${nextPrayerTime?.format}`;
      const currentTime = moment()
        .tz(prayerTimes?.timeZone)
        .format("hh:mm:ss A"); // Include seconds in current time format
      const azaanMoment = moment(azaanTime, "hh:mm:ss A");
      const currentMoment = moment(currentTime, "hh:mm:ss A");
      debugger
      let duration = moment.duration(azaanMoment.diff(currentMoment));
      // If remaining time is less than or equal to 0, add 1 hour
      if (duration.asMilliseconds() <= 0) {
      }
      setRemainTime({
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [prayerTimes]);

  const getPrayerTimings = () => {
    const timeZoneDate = moment.tz(new Date(), prayerTimes?.timeZone); // Bhopal uses the same timezone as Kolkata
    const date = timeZoneDate.toDate();
    const prayerTimesObj = new PrayerTimes(
      prayerTimes?.coordinates,
      date,
      prayerTimes?.params
    );
    var current = prayerTimesObj.currentPrayer();
    // const currentTime = moment().tz(prayerTimes?.timeZone).format("hh:mm A");
    var nextPrayerName = prayerTimesObj.nextPrayer();

    const nextPrayerDetails = prayerTimes?.prayerTimes.filter((item) => {
      if (item?.name.toLowerCase() == nextPrayerName.toLowerCase()) {
        return item;
      }
    });
    // console.log("bhai timer chal rha hai clock ka", nextPrayerDetails[0]);
    return nextPrayerDetails[0];
  };
  return (
    <ThemeProvider theme={theme}>
      <Box component="body" bgcolor="primary.main" height={"100vh"}>
        <Box
          justifyContent={"space-around"}
          component={"main"}
          display={"flex"}
          height={"58%"}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            aria-label="call to prayer box"
          >
            <Typography variant="h3">{`THE CALL TO PRAYER ${prayerTimes?.nextPrayerTime.key} IN`}</Typography>
            {prayerTimes ? <TimeCard Time={remain} /> : null}
          </Box>
          {prayerTimes ? <CurrentTiming Time={prayerTimes} /> : null}
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
