import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostApiCall } from "../api/apiCalls";

function Support({ session }) {
  const [formData, setFormData] = useState({
    email: "",
    subtitle: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subtitle) {
      newErrors.subtitle = "Subtitle is required";
    }
    if (!formData.feedback) {
      newErrors.feedback = "Feedback is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      let apiEndPoint = "supports";
      const detail = {
        data: {
          ...formData,
          userId: session?.id,
        },
      };
      const response = await PostApiCall(apiEndPoint, detail);
      if (response?.status === 200 || response?.status === 201) {
        setFormData({
          email: "",
          subtitle: "",
          feedback: "",
        });
        toast.success("Your Request Send Succussfully");
      } else {
        toast.error("Data not Send Please mail to Support Service mail");
      }
    }
  };

  return (
    <Box>
      <ToastContainer containerId={"supportContainer"} />
      <Paper>
        <Box display="flex" gap={3} flexDirection="column" p={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            variant="standard"
            fullWidth
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            error={!!errors.subtitle}
            helperText={errors.subtitle}
            required
          />
          <TextField
            label="Feedback"
            variant="standard"
            multiline
            maxRows={6}
            rows={6}
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            error={!!errors.feedback}
            helperText={errors.feedback}
            required
          />
          <Box display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Support;
