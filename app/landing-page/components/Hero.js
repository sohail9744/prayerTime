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
          alignItems: "start",
          pt: { xs: 14, sm: 20, lg: 15 },
          pb: { xs: 1, sm: 1 },
        }}
      >
        <Stack
          spacing={2}
          alignItems={{
            xs: "center",
            sm: "center",
            md: "start",
            lg: "start",
            xl: "start",
          }}
          sx={{ width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            sx={{
              fontSize: { xs: "larger", sm: "larger", xl: "42px", lg: "42px" },
              fontWeight: 600,
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
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
                xl: "flex",
              },
              fontSize: "medium",
              fontWeight: 400,
            }}
          >
            Say goodbye to traditional clocks! It&apos;s time to switch to
            Mosqtime.com&apos;s digital clock for mosques. Experience accuracy
            and convenience in just 3 easy steps. Our state-of-the-art digital
            clocks are designed specifically for mosques, ensuring precise
            prayer times and seamless synchronization with global Islamic
            calendars. With an easy-to-use interface and customizable features,
            Mosqtime.com offers a modern solution that enhances the spiritual
            experience for the community. Installation is a breeze, and our
            dedicated support team is always available to assist you. Best of
            all, it&apos;s completely free! Embrace the future of timekeeping
            with Mosqtime.com&apos;s digital clock and bring your mosque into
            the digital age. Transform the way you manage prayer schedules and
            community announcements, all while maintaining the highest level of
            reliability and precision.
          </Typography>
          <Typography
            textAlign="start"
            color="text.secondary"
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "block",
                lg: "none",
                xl: "none",
              },
            }}
          >
            Say goodbye to traditional clocks! It&apos;s time to switch to
            Mosqtime.com&apos;s digital clock for mosques. Experience accuracy
            and convenience in just 3 easy steps. Our state-of-the-art digital
            clocks are designed specifically for mosques, ensuring precise
            prayer times and seamless synchronization with global Islamic
            calendars.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{
              pt: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Link href="/api/auth/signup/?csrf=true">
              <Button
                startIcon={<ArrowRight />}
                fullWidth
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
            </Link>
          </Stack>
          <Typography variant="caption" textAlign="center">
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "flex",
              xl: "flex",
            },
          }}
        >
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
