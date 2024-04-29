import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { GetApiCall } from "../../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountMenu({ session }) {
  const [profile, setProfile] = React.useState({
    profilePhoto: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onHandleLogOut = () => {
    signOut({ callbackUrl: "/" });
  };
  React.useEffect(() => {
    fetchPrayerData();
  }, [session]);

  const fetchPrayerData = async () => {
    if (session) {
      const checkMethod = `users/${session?.id}?fields=id&fields&populate=photo`;
      const { photo, status } = await GetApiCall(checkMethod);

      if (status === 200) {
        setProfile({
          profilePhoto: photo?.url,
        });
      } else {
        toast.error("Something went wrong! Please reload the page");
      }
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={`http://localhost:1337${profile?.profilePhoto}`}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              bgcolor: "#e8e8ea",
            },
            bgcolor: "#e8e8ea",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "600" }}>
              {session?.title}
            </Typography>
            <Typography variant="caption">{session?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onHandleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography color={"#ff5630"}>Logout</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
