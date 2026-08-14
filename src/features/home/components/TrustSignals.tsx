import { Box, Container, Typography, Grid } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShieldIcon from "@mui/icons-material/Shield";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const TrustSignals = () => {
  const features = [
    {
      icon: <SpaIcon fontSize="large" />,
      title: "100% Organic",
      desc: "Sourced directly from local farms.",
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      title: "Next Day Delivery",
      desc: "Harvested today, at your door tomorrow.",
    },
    {
      icon: <ShieldIcon fontSize="large" />,
      title: "Cold-chain Integrity",
      desc: "Temperature controlled from farm to fridge.",
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "24/7 Support",
      desc: "Our farm-hands are always here to help.",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "white",
        py: 8,
        borderTop: "1px solid",
        borderColor: "grey.200",
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Box sx={{ color: "success.main", mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustSignals;
