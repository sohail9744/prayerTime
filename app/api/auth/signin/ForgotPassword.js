import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import Link from "next/link";
import { SendingEmail } from "../../../api/apiCalls";

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState("");
  const [otp, setOTP] = React.useState("");
  const [showOTP, setShowOTP] = React.useState(false);

  const handleSendEmail = async () => {
    try {
      // Send email with entered email address
      const payload = {
        data: {
          email: email,
        },
      };
      const urlParameter = "email-otp";
      const response = await SendingEmail(urlParameter);
      if (response.status === 200) {
        setShowOTP(true);
      } else {
        // Handle error scenario
        console.error("Failed to send email");
      }
    } catch (error) {
      // Handle error scenario
      console.error("Error:", error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Verify the entered OTP
      const response = await axios.post("/api/verify-otp", { email, otp });
      if (response.status === 200) {
        // Close the dialog upon successful OTP verification
        handleClose();
      } else {
        // Handle error scenario
        console.error("Invalid OTP");
      }
    } catch (error) {
      // Handle error scenario
      console.error("Error:", error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          if (showOTP) {
            handleVerifyOTP();
          } else {
            handleSendEmail();
          }
        },
        sx: {
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        },
      }}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <DialogTitle sx={{ padding: "0px" }}>
          {showOTP ? "Verify OTP" : "Reset password"}
        </DialogTitle>
        <OutlinedInput
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={showOTP}
        />
        {showOTP ? (
          <>
            <DialogContentText>
              Enter the 4-digit OTP sent to your email address.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="otp"
              name="otp"
              label="OTP"
              placeholder="Enter OTP"
              type="text"
              fullWidth
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </>
        ) : (
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a
            OTP.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          {showOTP ? "Verify" : "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
