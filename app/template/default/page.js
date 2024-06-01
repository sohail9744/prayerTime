"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { add } from "../../lib/features/Time/curTimeSlice";
import { PrayerDetail } from "../../Dashboard/components/PrayerDetail";
import { PrayerNamazTime } from "../../Dashboard/components/PrayerTime";
import moment from "moment-hijri";

function DefaultTheme() {
  const dispatch = useAppDispatch();
  const redux = useAppSelector((state) => state.currentTime.time);

  useEffect(() => {
    const saveNamzTimings = async () => {
      try {
        const namazLocationIfo = await PrayerDetail();
        const refershTime = setInterval(async () => {
          const namazDetails = await PrayerNamazTime(namazLocationIfo);
          dispatch(add(namazDetails));
        }, 1000);
        return () => clearInterval(refershTime);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    saveNamzTimings();
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(45deg, #f3ec78, #af4261, #f3ec78, #af4261)",
        backgroundSize: "600% 600%",
        animation: "gradientFlow 10s ease infinite",
        "@keyframes gradientFlow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
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
            variant="h2"
            sx={{
              fontSize: { xs: "4rem", md: "5rem", lg: "5rem", xl: "8rem" },
            }}
          >
            {moment().format("iD/iM/iYYYY")}
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
        </Box>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "5rem", md: "8rem", lg: "8rem", xl: "9rem" } }}
        >
          {redux.currentTime}
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "3rem", md: "5rem", lg: "3rem", xl: "7rem" } }}
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
                  <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: {
                          xs: "3rem",
                          sm: "4rem",
                          md: "5rem",
                          lg: "5rem",
                          xl: "7rem",
                        },
                      }}
                    >
                      {item.azaanTime}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: {
                          xs: "2rem",
                          sm: "2.5rem",
                          md: "3rem",
                          lg: "3rem",
                          xl: "4rem",
                        },
                      }}
                    >
                      {item.jamatTime}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: {
                        xs: "3rem",
                        sm: "4rem",
                        md: "5rem",
                        lg: "5rem",
                        xl: "7rem",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DefaultTheme;
