import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
  Container,
  SvgIcon,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Generic icon for time
// Import other specific icons you want to use here

function PrayerCard({ prayerName, azaanTime, Icon }) {
  // This component represents each prayer card
  return (
    <Card sx={{ minWidth: 200, m: 1 }}>
      <CardContent>
        <Icon fontSize="large" sx={{ mb: 1.5 }} />
        <Typography variant="h5" component="div">
          {prayerName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Azaan time: {azaanTime}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}

export default function LivePrayer() {
  // Replace these with actual prayer times and appropriate icons
  const prayers = [
    { name: "Fajr", time: "4:55:00 AM", icon: AccessTimeIcon },
    { name: "Dhuhr", time: "1:00:00 PM", icon: AccessTimeIcon },
    { name: "Asr", time: "4:30:00 PM", icon: AccessTimeIcon },
    { name: "Maghrib", time: "7:05:00 PM", icon: AccessTimeIcon },
    { name: "Isha", time: "8:30:00 PM", icon: AccessTimeIcon },
  ];

  return (
    <Container sx={{display: 'flex', flexDirection:'column', gap: 4}}>
      <Box display={"flex"} justifyContent={"center"}>
        <TextField
          hiddenLabel
          size="small"
          variant="outlined"
          aria-label="Enter your email location"
          placeholder="Enter your Location"
          inputProps={{
            autocomplete: "off",
            ariaLabel: "Enter your email address",
          }}
        />
      </Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexWrap={"wrap"}
      >
        {prayers.map((prayer, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
            <PrayerCard
              prayerName={prayer.name}
              azaanTime={prayer.time}
              Icon={prayer.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
