import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";

interface ProductRowProps {
  sectionTitle: string;
  products: Product[];
}

const ProductRow = ({ sectionTitle, products }: ProductRowProps) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 800,
          letterSpacing: "1px",
          color: "text.primary",
          textTransform: "uppercase",
          mb: 4,
        }}>
        {sectionTitle}
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.productId} size={{ xs: 6, sm: 4, md: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRow;
