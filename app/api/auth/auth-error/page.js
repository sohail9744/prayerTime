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
          gap: 2,
        }}
      >
        <Box>
          <Image
            src="/authError.svg"
            alt="Error"
            width={500}
            height={500}
          />
        </Box>
        <Typography variant="h4" component="h2" gutterBottom>
          You are Not authorized
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are not authorized person to access this page.
        </Typography>
        <Link href="/api/auth/signin/?csrf=true" variant="body2">
          <Button color="primary" variant="contained">
            Sign In
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ErrorPage;
