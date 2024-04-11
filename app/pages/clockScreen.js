import * as React from "react";

import Typography from "@mui/material/Typography";
import { Box, Divider, Link, Switch } from "@mui/material";
import AlertBox from "../components/alertBox";
import Cards from "../components/cards";

export default function ClockScreens() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="start">
      <AlertBox
        text="We are working Hard and will soon add more templates"
        iconText="info"
      />
      <Typography variant="h5">Preview url</Typography>
      <Box my={3}>
        <Link href="#" underline="always">
          https://namazhub.com/p1678939
        </Link>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography sx={{ my: 3 }} variant="h5">
        Template
      </Typography>
      <Cards />
    </Box>
  );
}
