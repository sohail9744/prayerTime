import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";

function UserSettings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    about: "",
  });

  const handleInputChange = (event) => {
    debugger;
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(formData); // Here you have all your data
    // TODO: POST request with formData
    // You might want to validate your data before sending
    /*     try {
      const response = await axios.post("/your-endpoint", formData);
      console.log(response.data); // Handle the response
    } catch (error) {
      console.error("There was an error!", error);
    } */
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }}>MK</Avatar>
          <Typography variant="caption" sx={{ mt: 2 }}>
            Allowed *.jpg, *.png max size of 3MB
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Upload
            </Button>
            <Button variant="outlined" color="error">
              Remove
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formData.name}
                  onChange={handleInputChange}
                  label="Name"
                  name="name"
                  placeholder="Enter Your Name"
                  fullWidth
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  label="Phone Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  label="Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  label="Country"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  label="State"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  label="City"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zip"
                  label="Zip/Code"
                  value={formData.zip}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="about"
                  multiline
                  rows={3}
                  fullWidth
                  label="About"
                  value={formData.about}
                  onChange={handleInputChange}
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
