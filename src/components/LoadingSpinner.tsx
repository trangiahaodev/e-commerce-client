import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: number;
}

const LoadingSpinner = ({
  message,
  fullScreen = false,
  size = 40,
}: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // If fullScreen is true, take up the whole viewport. Otherwise, pad it nicely.
        ...(fullScreen
          ? { minHeight: "100vh", width: "100%" }
          : { p: 4, width: "100%" }),
      }}>
      <CircularProgress color="success" size={size} thickness={4} />

      {message && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, fontWeight: 600, letterSpacing: "0.5px" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
