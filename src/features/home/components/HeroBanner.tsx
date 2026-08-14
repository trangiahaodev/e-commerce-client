import { Box, Typography, Button, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "400px", md: "500px" },
        backgroundImage: `url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80")`,
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
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        },
      }}>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: "600px", color: "white" }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 3,
              fontWeight: 700,
              color: "success.light",
              display: "block",
              mb: 1,
            }}>
            100% Certified Organic
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}>
            The True Taste of Nature.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}>
            Harvested daily. Delivered directly from our local partner farms to
            your doorstep within 24 hours.
          </Typography>

          <Button
            onClick={() => navigate("/products?category=seasonal")}
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 0,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: 0,
              "&:hover": {
                boxShadow: 0,
                backgroundColor: "success.dark",
              },
            }}>
            Shop Seasonal Picks
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBanner;
