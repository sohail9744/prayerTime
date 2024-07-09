"use client";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { add } from "../../../lib/features/Time/curTimeSlice";
import { PrayerDetail } from "../../../Dashboard/components/PrayerDetail";
import { PrayerNamazTime } from "../../../Dashboard/components/PrayerTime";
import moment from "moment-hijri";
import { getTemperature } from "../../../api/apiCalls";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../../globals.css";

// Define a custom theme to include the imported fonts
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
// Add Orbitron font to the component
const orbitronFont = {
  fontFamily: "Orbitron, sans-serif",
};

function DefaultTheme({ params }) {
  const [loader, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const redux = useAppSelector((state) => state.currentTime.time);
  const [temperature, setTemperature] = useState("");
  const [hijiri, setHijiriTime] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const saveNamzTimings = async () => {
      try {
        moment.locale("en");
        // console.log("ID is coming bro through route", params.userId);
        const namazLocationInfo = await PrayerDetail(params.userId);
        setCity(namazLocationInfo?.city);
        const refreshTime = setInterval(async () => {
          const namazDetails = await PrayerNamazTime(namazLocationInfo);
          dispatch(add(namazDetails));
        }, 1000);

        const initialTemperature = await fetchTemperature(
          namazLocationInfo.coordinates,
          namazLocationInfo.timeZoneDetails
        );
        setTemperature(initialTemperature);
        setHijiriTime(moment().format("iD iMMMM iYYYY[H]"));
        //Mohammad Sohail: Every 5 hour the Temperature will get the data
        const temperatureInterval = setInterval(async () => {
          const newTemperature = await fetchTemperature(
            namazLocationInfo.coordinates,
            namazLocationInfo.timeZoneDetails
          );
          setHijiriTime(moment().format("iD iMMMM iYYYY[H]"));
          setTemperature(newTemperature);
        }, 5 * 60 * 60 * 1000);
        setLoading(false);
        return () => {
          clearInterval(refreshTime);
          clearInterval(temperatureInterval);
        };
      } catch (error) {
        setLoading(false);
        console.error("Error fetching prayer times:", error);
      }
    };

    saveNamzTimings();
  }, [dispatch]);

  async function fetchTemperature(coordinates, timeZoneDetails) {
    try {
      const temperature = await getTemperature(
        coordinates?.latitude,
        coordinates?.longitude,
        timeZoneDetails
      );
      return temperature;
    } catch (error) {
      console.error("Error fetching the temperature:", error);
      return null;
    }
  }

  if (loader) {
    return (
      // <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      //   <CircularProgress />
      // </Box>
      <Backdrop
        sx={{
          color: "#fff",
          background:
            "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
        open={true}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "transparent",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
                stroke: "url(#gradient)",
              },
            }}
            size={100}
            thickness={7}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a1ffce" />
                <stop offset="50%" stopColor="#faffd1" />
                <stop offset="100%" stopColor="#d4fc79" />
              </linearGradient>
            </defs>
          </svg>
        </Box>
        <Typography fontWeight={550} variant="h6" sx={{ mt: 2 }}>
          Loading, please wait...
        </Typography>
      </Backdrop>
    );
  }
  // Add the other font imports here if needed
  return (
    <ThemeProvider theme={theme}>
      <Box
        component={"main"}
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(/defaultBg.png)`,
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={{md: "space-between", xl: "space-between", lg: "space-between", xs: "space-around"}}
        padding={0}
        margin={0}
        flex={1}
      >
        {/* Temperature Design Starts ------ */}
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          aria-label="Header Main box"
          component={"header"}
        >
          <Box
            marginTop={{ md: 2, xs: 1, xl: 2, lg: 2 }}
            padding={{ md: 3, xs: 1, lg: 3, xl: 4 }}
            bgcolor={"#4f6da463"}
            borderRadius={"20px 0 0 20px"}
            aria-label="Temperature Div"
          >
            <Typography
              sx={{
                fontSize: { xs: "15px", md: "3rem", lg: "5rem", xl: "6rem" },
                fontWeight: "bold",
                color: "black",
              }}
            >
              {temperature}°C
            </Typography>
          </Box>
        </Box>
        {/* Temperature Design Ends ------ */}
        {/* Sub Container Design Start ------ */}
        <Box
          display={"flex"}
          gap={1}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          component={"div"}
          aria-label="Main Content"
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginLeft={{ md: 31, lg: 31, xl: 31, xs: 0 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "21px", md: "3rem", lg: "5rem", xl: "6rem" },
                fontWeight: "400",
              }}
            >
              {hijiri}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "21px", md: "3rem", lg: "5rem", xl: "6rem" },
                fontWeight: "400",
              }}
            >
              {redux?.currentDate}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "21px", md: "3rem", lg: "5rem", xl: "6rem" },
                fontWeight: "400",
              }}
            >
              {redux?.currentDay}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "21px", md: "3rem", lg: "5rem", xl: "6rem" },
                fontWeight: "400",
              }}
            >
              {city}
            </Typography>
          </Box>
        </Box>
        {/* Sub Container Design Ends ------ */}
        {/* Time, slogan, heading, and time of namaz Design Starts ------ */}
        <Box
          gap={{ xs: 4, md: 4, lg: 4, xl: 5 }}
          display={"flex"}
          flexDirection={"column"}
          m={{ xs: 1, md: 4, lg: 4, xl: 5 }}
          component={"main"}
        >
          {/* Time and Slogan Design Starts ------ */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Box component={"span"}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "8rem",
                    lg: "8rem",
                    xl: "8rem",
                  },
                  fontWeight: 500,
                  ...orbitronFont,
                }}
              >
                {redux?.currentTime}
              </Typography>
            </Box>
            <Box component={"span"}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "3rem",
                    lg: "5rem",
                    xl: "6rem",
                  },
                  fontWeight: "bold",
                }}
              >
                لا إله إلا الله، محمد رسول الله
              </Typography>
            </Box>
          </Box>
          {/* Time and Slogan Design Ends ------ */}
          {/* List Header container Starts ------ */}
          <Box aria-label="List" component={"sub"}>
            <Box
              component={"sub"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <Box
                borderRadius={{ xs: "13px", md: "20px", xl: "25px" }}
                component="div"
                bgcolor={"rgba(173, 216, 230, 0.7)"}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "21px",
                      sm: "2rem",
                      md: "3rem",
                      lg: "5rem",
                      xl: "7rem",
                    },
                    fontWeight: "400",
                    m: 1,
                  }}
                >
                  JAMAAT
                </Typography>
              </Box>
              <Box
                borderRadius={{ xs: "13px", md: "20px", xl: "25px" }}
                component="div"
                bgcolor={"rgba(173, 216, 230, 0.7)"}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "21px",
                      sm: "2rem",
                      md: "3rem",
                      lg: "5rem",
                      xl: "7rem",
                    },
                    fontWeight: "400",
                    m: 1,
                  }}
                >
                  AZAAN
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* List Header container Design Ends ------ */}
          {/* Namaz List Design start --------- */}
          {redux?.prayerTimes && redux.prayerTimes.length > 0 && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              component={"main"}
            >
              {redux.prayerTimes.map((item, index) => (
                <Box
                  component={"sub"}
                  display={"flex"}
                  justifyContent={"space-around"}
                  bgcolor={"rgba(173, 216, 230, 0.7)"}
                  borderRadius={{ xs: "14px", md: "15px" }}
                  key={index}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "4rem",
                        md: "4rem",
                        lg: "5rem",
                        xl: "7rem",
                      },
                    }}
                  >
                    {item.jamatTime}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "4rem",
                        md: "4rem",
                        lg: "5rem",
                        xl: "7rem",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "4rem",
                        md: "4rem",
                        lg: "5rem",
                        xl: "7rem",
                      },
                    }}
                  >
                    {item.azaanTime}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {/* Namaz List Design ends --------- */}
        </Box>
        {/* Time, slogan, heading, and time of namaz Design Starts ------ */}
        {redux?.mosqName && (
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "4rem",
                  lg: "5rem",
                  xl: "7rem",
                },
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0000ff, #0000ff, #0000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {redux.mosqName}
            </Typography>
          </Box>
        )}
        {/* Company Logo Design ends --------- */}
        {/* <Box position={'sticky'} bottom={0} right={0} component={"footer"}> */}
        {/* <Box display={"flex"} justifyContent={"flex-end"} component={"footer"}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #6b8e23 0%, #8fbc8f 100%)",
              padding: 2,
              borderRadius: { xs: "5px", md: "20px 0 0 0" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.9rem",
                  md: "1.2rem",
                  lg: "2rem",
                  xl: "2.5rem",
                },
                fontWeight: "bold",
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.05em",
                textAlign: "end",
              }}
            >
              Powered by mosqtime.com
            </Typography>
          </Box>
        </Box> */}
        {/* Company Logo Design ends --------- */}
      </Box>
    </ThemeProvider>
  );
}

export default DefaultTheme;
