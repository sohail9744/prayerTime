"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { add } from "../../lib/features/Time/curTimeSlice";
import { PrayerDetail } from "../../Dashboard/components/PrayerDetail";
import { PrayerNamazTime } from "../../Dashboard/components/PrayerTime";
import moment from "moment-hijri";
import { getTemperature } from "../../api/apiCalls";

function DefaultTheme() {
  const dispatch = useAppDispatch();
  const redux = useAppSelector((state) => state.currentTime.time);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const saveNamzTimings = async () => {
      try {
        moment.locale("en");
        const namazLocationInfo = await PrayerDetail();
        const refreshTime = setInterval(async () => {
          const namazDetails = await PrayerNamazTime(namazLocationInfo);
          dispatch(add(namazDetails));
        }, 1000);

        const initialTemperature = await fetchTemperature(
          namazLocationInfo.coordinates,
          namazLocationInfo.timeZoneDetails
        );
        setTemperature(initialTemperature);
        //Mohammad Sohail: Every 5 hour the Temperature will get the data
        const temperatureInterval = setInterval(async () => {
          const newTemperature = await fetchTemperature(
            namazLocationInfo.coordinates,
            namazLocationInfo.timeZoneDetails
          );
          setTemperature(newTemperature);
        }, 5 * 60 * 60 * 1000);

        return () => {
          clearInterval(refreshTime);
          clearInterval(temperatureInterval);
        };
      } catch (error) {
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
      console.log("Temperature fetched:", temperature);
      return temperature;
    } catch (error) {
      console.error("Error fetching the temperature:", error);
      return null;
    }
  }
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(/defaultBg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 0,
          backgroundColor: "#4f6da463",
          padding: "10px 20px",
          borderRadius: "20px 0 0 20px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "4rem", md: "3rem", lg: "5rem", xl: "8rem" },
            fontWeight: "bold",
            color: "black",
          }}
        >
          {temperature}°C
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100vh",
          height: "100vw",
          textAlign: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "4rem", md: "3rem", lg: "5rem", xl: "8rem" },
              fontWeight: "bold",
            }}
          >
            {moment().format("iD iMMMM iYYYY")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "4rem", md: "4rem", lg: "4rem", xl: "8rem" },
            }}
          >
            {redux.currentDate}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "4rem", md: "4rem", lg: "4rem", xl: "8rem" },
            }}
          >
            {redux.currentDay}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "4rem", md: "4rem", lg: "4rem", xl: "8rem" },
            }}
          >
            {redux?.timeZone?.split("/")[1]}
          </Typography>
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", md: "8rem", lg: "8rem", xl: "9rem" },
          }}
        >
          {redux.currentTime}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "3rem", md: "5rem", lg: "3rem", xl: "7rem" },
          }}
        >
          <Typewriter
            words={[
              "رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَخَيْرُ الرَّاحِمِينَ",
              "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
              "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
              "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ",
            ]}
            loop={false}
            typeSpeed={0}
            deleteSpeed={0}
            delaySpeed={10000}
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              borderRadius: "20px",
              // bgcolor: "rgba(173, 216, 230, 0.7)",
              px: 3,
              mx: 2,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "4rem",
                  lg: "5rem",
                  xl: "7rem",
                },
                borderRadius: "20px",
                bgcolor: "rgba(173, 216, 230, 0.7)",
                p: 2,
                mx: 1,
              }}
            >
              Jamaat
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "4rem",
                  lg: "5rem",
                  xl: "7rem",
                },
                borderRadius: "20px",
                bgcolor: "rgba(173, 216, 230, 0.7)",
                p: 2,
                mx: 1,
              }}
            >
              Azaan
            </Typography>
          </Box>
          {redux.prayerTimes && redux.prayerTimes.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {redux.prayerTimes.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "20px",
                    bgcolor: "rgba(173, 216, 230, 0.7)",
                    p: 2,
                    mx: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: {
                          xs: "3rem",
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
                      variant="h4"
                      sx={{
                        fontSize: {
                          xs: "2rem",
                          sm: "2.5rem",
                          md: "64px",
                          lg: "3rem",
                          xl: "4rem",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: {
                          xs: "3rem",
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
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 120,
        }}
        component={"footer"}
      >
        {redux?.mosqName && (
          <Typography
            sx={{
              fontSize: {
                xs: "3rem",
                sm: "4rem",
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
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          background: "linear-gradient(135deg, #6b8e23 0%, #8fbc8f 100%)",
          padding: "15px 25px",
          borderRadius: "20px 0 0 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.2rem", md: "1.2rem", lg: "2rem", xl: "2.5rem" },
            fontWeight: "bold",
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Powered by mosqtime.com
        </Typography>
      </Box>
    </Box>
  );
}

export default DefaultTheme;
