import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import Location from "../components/location";
import AlertBox from "../components/alertBox";

function Config() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleLocationSelect = (locationDetails) => {
    setSelectedLocation(locationDetails);
  };
  return (
    <Box component="main">
      <AlertBox
        text="Make sure your internet is 'ON' to change the location!"
        iconText="info"
      />
      <Typography variant="h5">Set your Manual Location</Typography>
      <Divider sx={{ my: 2 }} />
      <Box component="div" flexDirection={'column'} gap={2} display="flex" flexWrap="wrap">
        <Location onSelect={handleLocationSelect} />
        {selectedLocation && (
          <Box>
            <Typography><strong>Selected Place:</strong> {selectedLocation.placeName}</Typography>
            <Typography><strong>Latitude:</strong> {selectedLocation.latitude}</Typography>
            <Typography><strong>Longitude:</strong> {selectedLocation.longitude}</Typography>
          </Box>
        )}
      </Box>
      <Box
        paddingTop="25px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  );
}

export default Config;
