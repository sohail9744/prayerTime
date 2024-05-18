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
        height: "1680px",
        width: "-webkit-fill-available",
        backgroundImage: 'url("/defaultTheme.jpg")',
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          height: "80%",
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
          <Typography variant="h4">{redux.currentDay}</Typography>
          <Typography variant="h4">{moment().format("iD/iM/iYYYY")}</Typography>
          <Typography variant="h4">{redux.currentDate}</Typography>
        </Box>
        <Typography variant="h1">{redux.currentTime}</Typography>
        <Typography variant="h4">
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
                  bgcolor: "rgba(173, 216, 230, 0.7)", // Light blue with transparency
                  p: 2,
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
                    <Typography variant="h4">{item.azaanTime}</Typography>
                    <Typography variant="h5">{item.jamatTime}</Typography>
                  </Box>
                  <Typography variant="h4">{item.name}</Typography>
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
