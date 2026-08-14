import {
  Box,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton"; // Import skeleton
import type { Product } from "../types/Product";

interface PLPGridProps {
  products: Product[];
  totalItems: number;
  isLoading: boolean; // Added isLoading prop
}

const PLPGrid = ({ products, totalItems, isLoading }: PLPGridProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSortChange = (event: SelectChangeEvent) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", event.target.value);
    setSearchParams(newParams);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "grey.200",
        }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 600 }}>
          {isLoading
            ? "Loading provisions..."
            : `Showing ${products.length} of ${totalItems} results`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}>
            Sort by:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={currentSort}
              onChange={handleSortChange}
              displayEmpty
              color="success"
              sx={{
                borderRadius: 0,
                "& .MuiSelect-select": { py: 1, fontSize: "0.875rem" },
              }}>
              <MenuItem value="newest">Newest Arrivals</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="best_selling">Best Selling</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Grid Content */}
      {isLoading ? (
        <Grid container spacing={4}>
          {/* Render 6 pulsing skeleton cards while loading */}
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{ xs: 6, sm: 6, md: 4 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.productId} size={{ xs: 6, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No provisions found matching your criteria.
          </Typography>
          <Button
            variant="text"
            color="success"
            sx={{ fontWeight: 600 }}
            onClick={() => setSearchParams(new URLSearchParams())}>
            Clear all filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PLPGrid;
