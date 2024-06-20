import React, { useState } from "react";
import {
  Box,
  Link,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyLinkComponent = ({ link }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 3,
        background: "#80808026",
        paddingLeft: 1,
        borderRadius: "2px",
      }}
    >
      <Link href={link} target="_blank" rel="noopener">
        <Typography>{link}</Typography>
      </Link>
      <ToastContainer style={{ width: "100%" }} containerId="sohail" />
      <Tooltip title="Copy to clipboard">
        <IconButton onClick={handleCopy} color="primary" aria-label="copy link">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CopyLinkComponent;
