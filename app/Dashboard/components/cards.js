import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import SvgComponent from "@/public/clock_screen";
import React, { useState } from "react";
import { CardActionArea } from "@mui/material";
import { Box, Divider, Switch, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function Cards() {
  const [isChecked, setIsChekced] = useState(true);
  const onHandleTheme = (event) => {
    debugger;
    setIsChekced(event?.target?.checked);
    toast.warn("Saved succussfully");
  };
  return (
    <>
      <ToastContainer />
      <Card sx={{ maxWidth: 345 }}>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Switch
            onChange={onHandleTheme}
            aria-label="Switch"
            color="success"
            checked={isChecked}
          />
        </CardActions>
          <CardMedia
            sx={{
              height: 140,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            image="/next.svg"
            title="green iguana"
          >
            <Box>
              <Link href="/templates/blueTheme" target="_blank">
                <Button variant="contained">Preview</Button>
              </Link>
            </Box>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Default Theme
            </Typography>
            <Typography variant="body2" color="text.primary">
              Our default theme offers a serene backdrop, seamlessly displaying
              accurate prayer timings for Masajid worldwide. Embrace a
              harmonious routine as you connect with your faith, guided by the
              convenience of our intuitive design.
            </Typography>
          </CardContent>
      </Card>
    </>
  );
}

export default Cards;
