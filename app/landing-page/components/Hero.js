"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight, PlayCircleOutline } from "@mui/icons-material";
// import { Image } from "mui-image";

import { Divider } from "@mui/material";
import Image from "next/image";
// import NextSvg from "/td_clock.svg";

// const StyledBox = styled("div")(({ theme }) => ({
//   alignSelf: "center",
//   width: "100%",
//   height: 400,
//   marginTop: theme.spacing(8),
//   borderRadius: theme.shape.borderRadius,
//   boxShadow:
//     theme.palette.mode === "light"
//       ? "0 0 12px 8px hsla(220, 25%, 80%, 0.2)"
//       : "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
//   outline: "1px solid",
//   backgroundImage: `url(${
//     theme.palette.mode === "light"
//       ? "/static/images/templates/templates-images/hero-light.png"
//       : "/static/images/templates/templates-images/hero-dark.png"
//   })`,
//   backgroundSize: "cover",
//   outlineColor:
//     theme.palette.mode === "light"
//       ? "hsla(220, 25%, 80%, 0.5)"
//       : "hsla(210, 100%, 80%, 0.1)",
//   [theme.breakpoints.up("sm")]: {
//     marginTop: theme.spacing(10),
//     height: 700,
//   },
// }));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
            : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column", lg: "row" },
          alignItems: "center",
          pt: { xs: 14, sm: 20, lg: 15 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          alignItems="start"
          useFlexGap
          sx={{ width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "flex-start",
              textAlign: "start",
            }}
          >
            <Typewriter
              words={[
                "Digital Clock for Mosque",
                "3 Steps to Setup!!!",
                "Free",
                "ساعة رقمية للمسجد",
                "Open Source",
                "Cami İçin Dijital Saat",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Typography>
          <Typography
            textAlign="start"
            color="text.secondary"
            sx={{ width: { sm: "100%", md: "80%" } }}
          >
            Say goodbye to traditional clocks! It&apos;s time to switch to
            Mosque-Box.com&apos;s digital clock for mosques. Experience accuracy
            and convenience in just 3 easy steps.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              startIcon={<ArrowRight />}
              fullWidth
              variant="contained"
              color="primary"
            >
              Get Started
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center">
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Stack>
          <Image
            width={344}
            height={344}
            src="/tdclock.svg"
            alt="something went wrong"
          />
        </Stack>
        {/* <StyledBox id="image" />   */}
      </Container>
    </Box>
  );
}
