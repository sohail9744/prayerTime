import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import AlertBox from "../components/alertBox";
import axios from "axios";

function CustomTime() {
  const [fazrTime, setFazrTime] = useState(null);
  const [zohrTime, setZohrTime] = useState(null);
  const [asrTime, setAsrTime] = useState(null);
  const [magribTime, setMagribTime] = useState(null);
  const [ishaTime, setIshaTime] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("apiEndpoint");
        if (response.status === 200) {
          // Check if data is received
          console.log(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show error snackbar, etc.
      }
    };

    fetchData();
  }, []);
  const handleSave = async () => {
    // Construct the data object with TimePicker values
    const data = {
      fazrTime,
      zohrTime,
      asrTime,
      magribTime,
      ishaTime,
    };

    // Example: Make API call here with the constructed data object
    try {
      // Example: Make API call using Axios
      const response = await axios.post("apiEndpoint", data);
      if (response.status === 200) {
        setOpenSnackbar(true); // Open success snackbar
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle error, show error snackbar, etc.
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <Box component="main">
      <AlertBox
        text="If your internet is connect to your TV the data will reflect in 15 minutes."
        iconText="info"
      />
      <Typography variant="h5">Azaan Timings</Typography>
      <Divider sx={{ my: 1 }} />
      <Box component="form" display="flex" flexWrap="wrap" gap={4} pt={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Fazr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Zohr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Asr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Magrib Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Isha Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Jumah Time" />
        </LocalizationProvider>
      </Box>
      <Typography sx={{ my: 3 }} variant="h5">
        Prayer Timings
      </Typography>
      <Divider />
      <Box
        width="100%"
        component="form"
        display="flex"
        flexWrap="wrap"
        gap={4}
        pt={3}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Fazr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Zohr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Asr Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Magrib Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Isha Time" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Jumah Time" />
        </LocalizationProvider>
      </Box>
      <Box pt={3} alignItems="center" display="flex" justifyContent="center">
        <Button onClick={handleClick} variant="contained">
          Submit
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Saved Successfully"
          action={action}
          TransitionComponent="SlideTransition"
        />
      </Box>
    </Box>
  );
}

export default CustomTime;
