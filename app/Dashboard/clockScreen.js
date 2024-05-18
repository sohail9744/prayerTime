"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Button,
  Switch,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardActionArea,
  Fade,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertBox from "./components/alertBox";
import { PrayerDetail } from "./components/PrayerDetail";
import { PrayerNamazTime } from "./components/PrayerTime";
import "./style/prayerTheme.css";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { add } from "../lib/features/Time/curTimeSlice";
const templateCards = [
  {
    id: 1,
    title: "Default Theme",
    points: ["Prayer Times", "Real Time Clock", "Custom location"],
    image: "/blueTheme.png",
    link: "/template/default",
  },
];

export default function ClockScreens() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const timingData = useAppSelector((state) => state.currentTime.time);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // useEffect(() => {
  //   const saveNamzTimings = async () => {
  //     try {
  //       const namazLocationIfo = await PrayerDetail();
  //       const refershTime = setInterval(async () => {
  //         const namazDetails = await PrayerNamazTime(namazLocationIfo);
  //         dispatch(add(namazDetails));
  //       }, 1000);
  //       // return () => clearInterval(refershTime);
  //       // return () => clearInterval(refershTime);
  //     } catch (error) {
  //       console.error("Error fetching prayer times:", error);
  //     }
  //   };
    
  //   saveNamzTimings();
  // }, [dispatch]);
  return (
    <Box display="flex" flexDirection="column" justifyContent="start">
      <ToastContainer containerId="sohail" />
      <AlertBox
        text="We are working Hard and will soon add more templates"
        iconText="info"
      />
      <Box display={"flex"} flexWrap={"wrap"} gap={3}>
        {templateCards.map((template) => (
          <Card key={template.id} sx={{ maxWidth: 310 }}>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ margin: "0px" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {template.title}
              </Typography>
            </CardActions>
            <CardActionArea
              onMouseLeave={() => setIsButtonVisible(false)}
              onMouseEnter={() => setIsButtonVisible(true)}
            >
              <CardMedia
                sx={{
                  height: 140,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                image={template.image}
                title="green iguana"
              >
                {isMounted && (
                  <Fade in={isButtonVisible}>
                    <Link href={template.link} target="_blank">
                      <Button variant="contained">Preview</Button>
                    </Link>
                  </Fade>
                )}
              </CardMedia>
            </CardActionArea>
            <CardContent>
              <List sx={{ display: "flex", flexWrap: "wrap" }}>
                {template?.points.map((point, index) => (
                  <ListItem sx={{ padding: "0px" }} key={index}>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <DoneIcon />
                    </ListItemIcon>
                    <Typography component={"span"}>{point}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
