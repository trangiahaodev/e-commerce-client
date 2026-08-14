import { Box, Container, Typography, Grid, Button } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = ["About Us", "Our Farms", "FAQ", "Contact"];

  return (
    <Box sx={{ bgcolor: "grey.900", color: "grey.300", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
              GREENHARVEST
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, pr: 4 }}>
              Bringing the freshest, locally sourced organic produce directly to
              your kitchen.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "success.main" },
                  }}>
                  {link}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Newsletter Subscribe */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
              Subscribe to our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Get weekly updates on seasonal harvests.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Note: You may want to add a TextField here later for the email input! */}
              <Button variant="contained" color="success" fullWidth>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Bar */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "grey.800",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}>
          <Typography variant="body2">
            © {currentYear} GreenHarvest. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
