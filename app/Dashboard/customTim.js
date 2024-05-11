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
import AlertBox from "./components/alertBox";
import dayjs, { Dayjs } from "dayjs";
import { GetApiCall, PostApiCall, UpdateApiCall } from "../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession, useSession } from "next-auth/react";

function CustomTime({ session }) {
  const [apiMethod, setMethod] = useState({
    method: null,
    prayerTime: null,
  });
  // console.log("CUSTOM TIME", session);
  const [data, setData] = useState({
    azaan_fajr: null,
    azaan_dhuhr: null,
    azaan_asr: null,
    azaan_maghrib: null,
    azaan_isha: null,
    azaan_jumah: null,
    pray_jumah: null,
    pray_fajr: null,
    pray_dhuhr: null,
    pray_asr: null,
    pray_maghrib: null,
    pray_isha: null,
  });
  useEffect(() => {
    fetchPrayerData();
  }, [session]);

  const fetchPrayerData = async () => {
    if (session) {
      const checkMethod = `prayer-times?&filters[user][id][$eq]=${session?.id}`;
      const { data, status } = await GetApiCall(checkMethod, session?.jwt);
      // console.log("DATA!", data, status);
      if (data?.length === 0) {
        setMethod({
          method: "POST",
        });
      } else {
        setMethod({
          method: "PUT",
          prayerTime: data[0],
        });
        let nDetails = data[0]?.attributes;
        setData({
          azaan_fajr: nDetails?.azaan_fajr,
          azaan_dhuhr: nDetails?.azaan_dhuhr,
          azaan_asr: nDetails?.azaan_asr,
          azaan_maghrib: nDetails?.azaan_maghrib,
          azaan_isha: nDetails?.azaan_isha,
          azaan_jumah: nDetails?.azaan_jumah,
          pray_jumah: nDetails?.pray_jumah,
          pray_fajr: nDetails?.pray_fajr,
          pray_dhuhr: nDetails?.pray_dhuhr,
          pray_asr: nDetails?.pray_asr,
          pray_maghrib: nDetails?.pray_maghrib,
          pray_isha: nDetails?.pray_isha,
        });
      }
    }
  };
  const handleInputChange = (value, name) => {
    const isoDate = value ? value.toISOString() : null;
    setData((prevFormData) => setData({ ...prevFormData, [name]: isoDate }));
  };

  const onSubmitForm = async (ev) => {
    ev.preventDefault();

    if (apiMethod?.method === "PUT") {
      const apiEndPoint = `prayer-times/${apiMethod?.prayerTime?.id}`;
      const detail = {
        data: {
          ...data,
        },
      };
      debugger
      const responseData = await UpdateApiCall(apiEndPoint, detail, session?.jwt);
      if (responseData?.status === 200) {
        toast.success("Updated succussfully");
      } else {
        toast.error("Data not saved something went wrong!");
      }
    }

    if (apiMethod?.method === "POST") {
      const apiEndPoint = "prayer-times";
      const detail = {
        data: {
          ...data,
          user: [session?.id],
        },
      };
      debugger
      const responseData = await PostApiCall(apiEndPoint, detail, session?.jwt);
      if (responseData?.status === 200) {
        fetchPrayerData();
        toast.success("Saved succussfully");
      } else {
        toast.error("Data not saved something went wrong!");
      }
    }
  };

  return (
    <Box component="main">
      <ToastContainer containerId={"containerCustomTim"} />
      <AlertBox
        text="If your internet is connect to your TV the data will reflect in 15 minutes."
        iconText="info"
      />
      <Typography variant="h5">Azaan Timings</Typography>
      <Divider sx={{ my: 1 }} />
      <Box component="form" display="flex" flexWrap="wrap" gap={4} pt={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Fajr Time"
            value={
              data?.azaan_fajr ? dayjs(data?.azaan_fajr) : data?.azaan_fajr
            }
            onChange={(newValue) => handleInputChange(newValue, "azaan_fajr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Dhuhr Time"
            value={
              data?.azaan_dhuhr ? dayjs(data?.azaan_dhuhr) : data?.azaan_dhuhr
            }
            name="azaan_dhuhr"
            onChange={(newValue) => handleInputChange(newValue, "azaan_dhuhr")}
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
            label="Fajr Time"
            value={data?.pray_fajr ? dayjs(data?.pray_fajr) : data?.pray_fajr}
            name="pray_fajr"
            onChange={(newValue) => handleInputChange(newValue, "pray_fajr")}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Dhuhr Time"
            value={
              data?.pray_dhuhr ? dayjs(data?.pray_dhuhr) : data?.pray_dhuhr
            }
            name="pray_dhuhr"
            onChange={(newValue) => handleInputChange(newValue, "pray_dhuhr")}
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
