import { Box, Typography } from "@mui/material";

interface PromoCardProps {
  title: string;
  subtitle: string;
  bgImage: string;
  height: string | number | Record<string, string | number>;
}

const PromoCard = ({ title, subtitle, bgImage, height }: PromoCardProps) => (
  <Box
    sx={{
      height: height,
      width: "100%",
      borderRadius: 4,
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60%",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
      },
    }}>
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        left: 24,
        zIndex: 1,
        color: "white",
      }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "grey.300", mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>
  </Box>
);

export default PromoCard;
