import { React, useState } from "react";
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
import Config from "./config";
import Help from "./help";
import AccountMenu from "../components/profileBar";
import ClockScreens from "./clockScreen";
import Support from "./support";
import {
  MdMoreTime,
  MdShareLocation,
  MdOutlineScreenshotMonitor,
} from "react-icons/md";
import { BiSupport, BiHelpCircle } from "react-icons/bi";
import "../globals.css";
const drawerWidth = 230;

export default function Dashboard() {
  const [focused, setFocused] = useState(0);
  const onHandleItem = (item) => {
    setFocused(item.key);
  };

  const handleItemClick = (index) => {};
  const listData = [
    { name: "Prayer Time", key: 0, icon: <MdMoreTime /> },
    { name: "Configuration", key: 1, icon: <MdShareLocation /> },
    { name: "Screens", key: 2, icon: <MdOutlineScreenshotMonitor /> },
    { name: "User Guide", key: 3, icon: <BiHelpCircle /> },
    { name: "Support", key: 4, icon: <BiSupport /> },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <AccountMenu />
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
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          Logo
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
        {focused === 0 ? <CustomTime /> : null}
        {focused === 1 ? <Config /> : null}
        {focused === 2 ? <ClockScreens /> : null}
        {focused === 3 ? <Help /> : null}
        {focused === 4 ? <Support /> : null}
      </Box>
    </Box>
  );
}
