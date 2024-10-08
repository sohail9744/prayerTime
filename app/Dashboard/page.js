"use client";
import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CustomTime from "./customTim";
import Config from "./location";
import Help from "./help";
import AccountMenu from "./components/profileBar";
import ClockScreens from "./clockScreen";
import Support from "./support";
import {
  MdMoreTime,
  MdShareLocation,
  MdOutlineScreenshotMonitor,
  MdMenu,
} from "react-icons/md";
import { BiSupport, BiHelpCircle } from "react-icons/bi";
import "../globals.css";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Settings } from "@mui/icons-material";
import UserSettings from "./profile_setting";
import { ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
const drawerWidth = 230;

export default function Dashboard() {
  const [focused, setFocused] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchData();
  });
  async function fetchData() {
    console.log("Session Detail", { session, status });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const onHandleItem = (item) => {
    // fetchData();
    setFocused(item.key);
    handleDrawerToggle();
  };

  const handleItemClick = (index) => {};
  const listData = [
    { name: "Screens", key: 0, icon: <MdOutlineScreenshotMonitor /> },
    { name: "Prayer Time", key: 1, icon: <MdMoreTime /> },
    { name: "Location", key: 2, icon: <MdShareLocation /> },
    { name: "User Guide", key: 3, icon: <BiHelpCircle /> },
    { name: "Settings", key: 4, icon: <Settings /> },
    { name: "Support", key: 5, icon: <BiSupport /> },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            opacity: "90%",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* add icon */}
            {matches && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MdMenu />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Prayer Time, Perfected with MosqTime
            </Typography>
            <AccountMenu session={session} />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant={matches ? "temporary" : "permanent"}
          open={matches ? mobileOpen : true}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={handleDrawerToggle}
        >
          <Toolbar>
            <Box>
              <Image src="/logo.svg" height={150} width={150} />
            </Box>
          </Toolbar>
          <Divider />
          <List>
            {listData.map((item, index) => (
              <ListItem
                onClick={() => onHandleItem(item)}
                key={item.key}
                disablePadding
                sx={{ px: "9px", py: "4px" }}
              >
                <ListItemButton
                  disablePadding
                  sx={{
                    marginBottom: "2px",
                    "&:focus": {
                      background: "rgb(0 167 111 / 16%)",
                      borderRadius: "6px",
                    },
                    background:
                      item.key === focused ? "rgb(0 167 111 / 16%)" : "inherit",
                    borderRadius: "6px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      // Apply the fill color conditionally here
                      fill: item.key === focused ? "#00a76f" : "#637381",
                      // Ensure the style is applied to the SVG element
                      "& svg": {
                        fill: "inherit",
                        width: "56px",
                        height: "25px",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        color: item.key === focused ? "#00a76f" : "#637381",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {focused === 0 ? <ClockScreens session={session} /> : null}
          {focused === 1 ? <CustomTime session={session} /> : null}
          {focused === 2 ? <Config session={session} /> : null}
          {focused === 3 ? <Help /> : null}
          {focused === 4 ? <UserSettings session={session} /> : null}
          {focused === 5 ? <Support session={session} /> : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
