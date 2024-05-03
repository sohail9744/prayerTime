import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Location from "./components/location";
import AlertBox from "./components/alertBox";
import { GetApiCall, UpdateApiCall } from "../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Config({ session }) {
  const [selectedLocation, setSelectedLocation] = useState({
    placeName: "",
    latitude: "",
    longitude: "",
  });
  const handleLocationSelect = (locationDetails) => {
    setSelectedLocation({
      placeName: locationDetails?.placeName,
      latitude: locationDetails?.latitude,
      longitude: locationDetails?.longitude,
    });
  };
  useEffect(() => {
    fetchPrayerData();
  }, [session]);

  const fetchPrayerData = async () => {
    if (session) {
      const checkMethod = `users/${session.id}?fields=location`;
      const { id, location, status } = await GetApiCall(checkMethod);
      setSelectedLocation({
        placeName: location?.placeName,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
    }
  };
  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    const apiEndPoint = `users/${session.id}`;
    const detail = {
      location: {
        ...selectedLocation,
      },
    };
    const responseData = await UpdateApiCall(apiEndPoint, detail);
    if (responseData?.status === 200) {
      toast.success("Updated succussfully");
    } else {
      toast.error("Data not saved something went wrong!");
    }
  };
  return (
    <Box component="main">
      <ToastContainer containerId={'containerLocation'}/>
      <AlertBox
        text="Make sure your internet is 'ON' to change the location!"
        iconText="info"
      />
      <Typography variant="h5">Set your Manual Location</Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        component="div"
        flexDirection={"column"}
        gap={2}
        display="flex"
        flexWrap="wrap"
      >
        <Location selectedLocation={selectedLocation} onSelect={handleLocationSelect} />
        {selectedLocation && (
          <Box>
            <Typography>
              <strong>Selected Place:</strong> {selectedLocation.placeName}
            </Typography>
            <Typography>
              <strong>Latitude:</strong> {selectedLocation.latitude}
            </Typography>
            <Typography>
              <strong>Longitude:</strong> {selectedLocation.longitude}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        paddingTop="25px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" onClick={onHandleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Config;
