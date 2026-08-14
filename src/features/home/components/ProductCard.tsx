import { Box, Typography } from "@mui/material";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}>
        <img
          src={product.imageUrl}
          alt={product.productName}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 600,
        }}>
        {product.brand}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          mt: 0.5,
          mb: 1,
          color: "text.primary",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
        {product.productName}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700, color: "success.dark" }}>
        ${product.basePrice}
      </Typography>
    </Box>
  );
};

export default ProductCard;
