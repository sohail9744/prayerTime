'use client'
import React from "react";
import { Box, Button, Typography, Link, Container } from "@mui/material";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 2,
          gap: 3,
        }}
      >
        <Box>
          <Image src="/error.svg" alt="Error" width={500} height={500} />
        </Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It seems the username or password you entered is incorrect. Please
          check your credentials and try again.
        </Typography>
        <Link href="/" variant="body2">
          <Button color="secondary" variant="outlined">
            Back to Home Page
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ErrorPage;
