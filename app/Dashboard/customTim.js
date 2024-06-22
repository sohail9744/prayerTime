import { Fragment, useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AlertBox from "./components/alertBox";
import dayjs, { Dayjs } from "dayjs";
import { GetApiCall, PostApiCall, UpdateApiCall } from "../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WidthFull } from "@mui/icons-material";

function CustomTime({ session }) {
  const [apiMethod, setMethod] = useState({
    method: null,
    prayerTime: null,
  });

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
      if (data?.length === 0) {
        setMethod({ method: "POST" });
      } else {
        setMethod({ method: "PUT", prayerTime: data[0] });
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
    setData((prevFormData) => ({ ...prevFormData, [name]: isoDate }));
  };

  const renderTimePicker = (label, value, name) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value ? dayjs(value) : value}
        onChange={(newValue) => handleInputChange(newValue, name)}
        slotProps={{
          field: { clearable: true },
        }}
      />
    </LocalizationProvider>
  );

  const onSubmitForm = async (ev) => {
    ev.preventDefault();

    if (apiMethod?.method === "PUT") {
      const apiEndPoint = `prayer-times/${apiMethod?.prayerTime?.id}`;
      const detail = { data: { ...data } };
      const responseData = await UpdateApiCall(
        apiEndPoint,
        detail,
        session?.jwt
      );
      if (responseData?.status === 200) {
        toast.success("Updated successfully");
      } else {
        toast.error("Data not saved, something went wrong!");
      }
    }

    if (apiMethod?.method === "POST") {
      const apiEndPoint = "prayer-times";
      const detail = { data: { ...data, user: [session?.id] } };
      const responseData = await PostApiCall(apiEndPoint, detail, session?.jwt);
      if (responseData?.status === 200) {
        fetchPrayerData();
        toast.success("Saved successfully");
      } else {
        toast.error("Data not saved, something went wrong!");
      }
    }
  };

  return (
    <Box component="main">
      <ToastContainer containerId={"containerCustomTim"} />
      <AlertBox
        text="If your internet is connected to your TV, the data will reflect in 15 minutes."
        iconText="info"
      />
      <Typography variant="h5">Azaan Timings</Typography>
      <Divider sx={{ my: 1 }} />
      <Box component="form" display="flex" flexWrap="wrap" gap={4} pt={3}>
        {renderTimePicker("Fajr Time", data?.azaan_fajr, "azaan_fajr")}
        {renderTimePicker("Dhuhr Time", data?.azaan_dhuhr, "azaan_dhuhr")}
        {renderTimePicker("Asr Time", data?.azaan_asr, "azaan_asr")}
        {renderTimePicker("Magrib Time", data?.azaan_maghrib, "azaan_maghrib")}
        {renderTimePicker("Isha Time", data?.azaan_isha, "azaan_isha")}
        {renderTimePicker("Jumah Time", data?.azaan_jumah, "azaan_jumah")}
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
        {renderTimePicker("Fajr Time", data?.pray_fajr, "pray_fajr")}
        {renderTimePicker("Dhuhr Time", data?.pray_dhuhr, "pray_dhuhr")}
        {renderTimePicker("Asr Time", data?.pray_asr, "pray_asr")}
        {renderTimePicker("Magrib Time", data?.pray_maghrib, "pray_maghrib")}
        {renderTimePicker("Isha Time", data?.pray_isha, "pray_isha")}
        {renderTimePicker("Jumah Time", data?.pray_jumah, "pray_jumah")}
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
