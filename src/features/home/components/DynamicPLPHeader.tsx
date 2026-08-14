import { Box, Container, Typography } from "@mui/material";
import React from "react";

interface DynamicPLPHeaderProps {
  category?: string | null;
  search?: string | null;
}

const DynamicPLPHeader = ({ category, search }: DynamicPLPHeaderProps) => {
  // 1. Search state layout
  if (search) {
    return (
      <Box
        sx={{
          bgcolor: "white",
          pt: { xs: 4, md: 8 },
          pb: { xs: 4, md: 6 },
          borderBottom: "1px solid",
          borderColor: "grey.200",
        }}>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "text.primary" }}>
            Search results for:
            <Box
              component="span"
              sx={{ color: "success.main", fontWeight: 800 }}>
              "{search}"
            </Box>
          </Typography>
        </Container>
      </Box>
    );
  }

  // 2. Category State Layout
  if (category) {
    // Format category text (e.g., "seasonal" -> "SEASONAL")
    const formattedCategory = category.toUpperCase().replace("-", " ");

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "200px", md: "250px" },
          backgroundImage: `url("https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)", // Dark overlay
          },
        }}>
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "white",
              letterSpacing: "2px",
            }}>
            {formattedCategory}
          </Typography>
        </Container>
      </Box>
    );
  }

  // 3. Fallback Layout
  return (
    <Box sx={{ bgcolor: "grey.50", py: 6, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "1px" }}>
          ALL PROVISIONS
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
          Fresh, organic, and locally sourced.
        </Typography>
      </Container>
    </Box>
  );
};

export default DynamicPLPHeader;
