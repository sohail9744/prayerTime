import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { GetApiCall, UpdateApiCall } from "../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploading from "react-images-uploading";

function UserSettings({ session }) {
  const [userFormData, setFormData] = useState({
    title: "",
    email: "",
    mobileNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    photo: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    fetchPrayerData();
  }, [session]);

  const fetchPrayerData = async () => {
    if (session) {
      const checkMethod = `users/${session?.id}?fields=title&fields=email&fields=mobileNumber&fields=address&fields=country&fields=state&fields=city&fields=zipcode&fields=photo`;
      const users = await GetApiCall(checkMethod);
      if (users?.status === 200) {
        delete users?.status;
        setFormData((prevuserFormData) => ({
          ...prevuserFormData,
          title: users?.title,
          email: users?.email,
          mobileNumber: users?.mobileNumber,
          address: users?.address,
          country: users?.country,
          state: users?.state,
          city: users?.city,
          zipcode: users?.zipcode,
          photo: users?.photo,
        }));
      } else {
        toast.error("Something went wrong! Please reload the page");
      }
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevuserFormData) => ({
      ...prevuserFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const apiEndPoint = `users/${session.id}`;
    delete userFormData?.photo;
    const detail = {
      ...userFormData,
    };
    const responseData = await UpdateApiCall(apiEndPoint, detail);
    if (responseData?.status === 200) {
      toast.success("Updated succussfully");
    } else {
      toast.error("Data not saved something went wrong!");
    }
  };

  //Image code start from here
  const onImageChange = async (imageList) => {
    if (imageList.length > 0) {
      const image = imageList[0];
      const apiEndPoint = `users/${session.id}`;
      const detail = {
        photo: image?.data_url,
      };
      const responseData = await UpdateApiCall(apiEndPoint, detail);
      if (responseData?.status === 200) {
        fetchPrayerData();
        toast.success("Image Uploaded succussfully");
      } else {
        toast.error("Image not saved something went wrong!");
      }
    }
  };
  const onImageError = (errors) => {
    if (errors.maxFileSize || errors.acceptType) {
      toast.error("Image must be in limit");
    }
  };
  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <Grid item xs={12} md={4}>
        <ImageUploading
          value={profileImage ? [profileImage] : []}
          onChange={onImageChange}
          maxNumber={1} // Assuming only one image for profile
          dataURLKey="data_url"
          maxFileSize={1048576} // Max image size (1MB = 1048576 bytes)
          acceptType={["jpg", "jpeg", "png", "svg"]} // Acceptable file types
          onError={onImageError}
        >
          {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
            <Paper
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userFormData?.photo}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="caption" sx={{ mt: 2 }}>
                Allowed *.jpg, *.png max size of 1MB
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={onImageUpload}
                  variant="outlined"
                  sx={{ mr: 1 }}
                >
                  Upload
                </Button>
                <Button
                  onClick={onImageRemoveAll}
                  variant="outlined"
                  color="error"
                >
                  Remove
                </Button>
              </Box>
            </Paper>
          )}
        </ImageUploading>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={userFormData.title}
                  onChange={handleInputChange}
                  label="Name"
                  name="title"
                  placeholder="Enter Your Name"
                  fullWidth
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  value={userFormData.email}
                  onChange={handleInputChange}
                  label="Email Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="mobileNumber"
                  value={userFormData.mobileNumber}
                  onChange={handleInputChange}
                  label="Phone Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address"
                  value={userFormData.address}
                  onChange={handleInputChange}
                  label="Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  value={userFormData.country}
                  onChange={handleInputChange}
                  label="Country"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  value={userFormData.state}
                  onChange={handleInputChange}
                  label="State"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  value={userFormData.city}
                  onChange={handleInputChange}
                  label="City"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zipcode"
                  label="Zip/Code"
                  value={userFormData.zipcode}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid textAlign={"end"} item xs={12}>
                <Button
                  sx={{ bgcolor: "rgb(33, 43, 54)" }}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserSettings;
