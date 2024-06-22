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
import CopyLinkComponent from "./components/CopyLinkComponent";

const templateCards = [
  {
    id: 1,
    title: "Default Theme",
    points: ["Prayer Times", "Real Time Clock", "Custom location"],
    image: "/defaultClock.png",
    link: "https://mosqtime.com/template/default",
  },
];

export default function ClockScreens({ session }) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const timingData = useAppSelector((state) => state.currentTime.time);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const link = `https://mosqtime.com/template/default/${session?.id}`;

  return (
    <Box display="flex" flexDirection="column" justifyContent="start">
      <ToastContainer containerId="sohail" />
      <AlertBox
        text="Click on the card to preview the screen"
        iconText="info"
      />
      <CopyLinkComponent link={link} />
      <Box display={"flex"} flexWrap={"wrap"} gap={3}>
        {templateCards.map((template) => (
          <Card key={template.id} sx={{ maxWidth: 310 }}>
            <CardActionArea
              onMouseLeave={() => setIsButtonVisible(false)}
              onMouseEnter={() => setIsButtonVisible(true)}
            >
              <CardMedia
                sx={{
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                image={template.image}
                title="green iguana"
              >
                {isMounted && (
                  <Fade in={isButtonVisible}>
                    <Link
                      href={`${template.link}/${session?.id}`}
                      target="_blank"
                    >
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
