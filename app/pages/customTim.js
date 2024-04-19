import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  Typography,
  IconButton,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import AlertBox from "../components/alertBox";
import dayjs, { Dayjs } from "dayjs";
import { GetApiCall, PostApiCall } from "../components/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomTime() {
  const [data, setData] = useState({
    azaan_fazr: null,
    azaan_zuhr: null,
    azaan_asr: null,
    azaan_maghrib: null,
    azaan_isha: null,
    azaan_jumah: null,
    pray_jumah: null,
    pray_fazr: null,
    pray_zuhr: null,
    pray_asr: null,
    pray_maghrib: null,
    pray_isha: null,
  });
  const handleInputChange = (value, name) => {
    const isoDate = value ? value.toISOString() : null;
    setData((prevFormData) => setData({ ...prevFormData, [name]: isoDate }));
  };

  const onSubmitForm = async (ev) => {
    ev.preventDefault();
    const apiEndPoint = "prayer-times";
    const detail = {
      data: data,
    };
    const responseData = await PostApiCall(apiEndPoint, detail);
    if (responseData?.status === 200) {
      toast.success("Saved succussfully");
    } else {
      toast.error("Data not saved something went wrong!");
    }
  };

  useEffect(() => {
    const fetchPrayerData = async () => {
      const endpoint = "prayer-times";
      const getPrayerData = await GetApiCall(endpoint);
      // Handle the received data here
    };
    fetchPrayerData();
  }, []);
  return (
    <Box component="main">
      <ToastContainer />
      <AlertBox
        text="If your internet is connect to your TV the data will reflect in 15 minutes."
        iconText="info"
      />
      <Typography variant="h5">Azaan Timings</Typography>
      <Divider sx={{ my: 1 }} />
      <Box component="form" display="flex" flexWrap="wrap" gap={4} pt={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Fazr Time"
            value={
              data?.azaan_fazr ? dayjs(data?.azaan_fazr) : data?.azaan_fazr
            }
            onChange={(newValue) => handleInputChange(newValue, "azaan_fazr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Zohr Time"
            value={
              data?.azaan_zuhr ? dayjs(data?.azaan_zuhr) : data?.azaan_zuhr
            }
            name="azaan_zuhr"
            onChange={(newValue) => handleInputChange(newValue, "azaan_zuhr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Asr Time"
            value={data?.azaan_asr ? dayjs(data?.azaan_asr) : data?.azaan_asr}
            name="azaan_asr"
            onChange={(newValue) => handleInputChange(newValue, "azaan_asr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Magrib Time"
            value={
              data?.azaan_maghrib
                ? dayjs(data?.azaan_maghrib)
                : data?.azaan_maghrib
            }
            name="azaan_maghrib"
            onChange={(newValue) =>
              handleInputChange(newValue, "azaan_maghrib")
            }
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Isha Time"
            value={
              data?.azaan_isha ? dayjs(data?.azaan_isha) : data?.azaan_isha
            }
            name="azaan_isha"
            onChange={(newValue) => handleInputChange(newValue, "azaan_isha")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Jumah Time"
            value={
              data?.azaan_jumah ? dayjs(data?.azaan_jumah) : data?.azaan_jumah
            }
            name="azaan_jumah"
            onChange={(newValue) => handleInputChange(newValue, "azaan_jumah")}
          />
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
          <TimePicker
            label="Fazr Time"
            value={data?.pray_fazr ? dayjs(data?.pray_fazr) : data?.pray_fazr}
            name="pray_fazr"
            onChange={(newValue) => handleInputChange(newValue, "pray_fazr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Zohr Time"
            value={data?.pray_zuhr ? dayjs(data?.pray_zuhr) : data?.pray_zuhr}
            name="pray_zuhr"
            onChange={(newValue) => handleInputChange(newValue, "pray_zuhr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Asr Time"
            value={data?.pray_asr ? dayjs(data?.pray_asr) : data?.pray_asr}
            name="pray_asr"
            onChange={(newValue) => handleInputChange(newValue, "pray_asr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Magrib Time"
            value={
              data?.pray_maghrib
                ? dayjs(data?.pray_maghrib)
                : data?.pray_maghrib
            }
            name="pray_maghrib"
            onChange={(newValue) => handleInputChange(newValue, "pray_maghrib")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Isha Time"
            value={data?.pray_isha ? dayjs(data?.pray_isha) : data?.pray_isha}
            name="pray_isha"
            onChange={(newValue) => handleInputChange(newValue, "pray_isha")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Jumah Time"
            value={
              data?.pray_jumah ? dayjs(data?.pray_jumah) : data?.pray_jumah
            }
            name="pray_jumah"
            onChange={(newValue) => handleInputChange(newValue, "pray_jumah")}
          />
        </LocalizationProvider>
      </Box>
      <Box pt={3} alignItems="center" display="flex" justifyContent="center">
        <Button onClick={onSubmitForm} variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default CustomTime;
