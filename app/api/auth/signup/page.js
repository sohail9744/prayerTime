"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Card as MuiCard } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ToggleColorMode from "./ToggleColorMode";
import getSignUpTheme from "./getSignUpTheme";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  gap: theme.spacing(4),
  width: "100%",
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "light"
      ? "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px"
      : "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
    width: "450px",
    overflow: "auto",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "auto",
  paddingBottom: theme.spacing(12),
  backgroundImage:
    theme.palette.mode === "light"
      ? "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))"
      : "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.up("sm")]: {
    paddingBottom: 0,
    height: "100vh",
  },
}));

export default function SignUp() {
  const [mode, setMode] = React.useState("light");
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();
  
    if (!isValid) {
      return; // Do not proceed if form inputs are invalid
    }
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
  
    try {
      const result = await signIn("credentials", {
        name,
        page: "signUp",
        email,
        password,
        callbackUrl: "/Dashboard",
      });
  
      if (result?.error === "CredentialsSignin") {
        // Handle invalid credentials error
        setEmailError(true);
        setEmailErrorMessage("Invalid email or password.");
        setPasswordError(true);
        setPasswordErrorMessage("Invalid email or password.");
      } else if (result?.error) {
        // Handle other authentication errors
        setEmailError(true);
        setEmailErrorMessage("Login failed: " + result.error);
        setPasswordError(true);
        setPasswordErrorMessage("Login failed: " + result.error);
      }
    } catch (error) {
      // Handle generic error (e.g., network issues)
      setEmailError(true);
      setEmailErrorMessage("Login failed: " + error.message);
      setPasswordError(true);
      setPasswordErrorMessage("Login failed: " + error.message);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline />
      <SignUpContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: { xs: "static", sm: "fixed" },
            width: "100%",
            p: { xs: 2, sm: 4 },
          }}
        >
          <Button startIcon={<ArrowBackRoundedIcon />} component="a" href="/">
            Back
          </Button>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack
          justifyContent="center"
          sx={{ height: { xs: "100%", sm: "100vh" }, p: 2 }}
        >
          <Card id="formData">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image src="/logo.svg" height={150} width={150} alt="Logo" />
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs} // Move this validation to onSubmit of the form
              >
                Sign up
              </Button>
              <Link
                href="/api/auth/signin/?csrf=true"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
