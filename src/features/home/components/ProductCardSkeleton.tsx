import { Box, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      {/* Image box placeholder */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ aspectRatio: "1 / 1", mb: 2, bgcolor: "grey.200" }}
      />
      {/* Brand placeholder */}
      <Skeleton
        variant="text"
        width="40%"
        height={20}
        sx={{ mx: "auto", mb: 1, bgcolor: "grey.200" }}
      />
      {/* Product Name placeholder */}
      <Skeleton
        variant="text"
        width="80%"
        height={24}
        sx={{ mx: "auto", bgcolor: "grey.200" }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={24}
        sx={{ mx: "auto", mb: 1, bgcolor: "grey.200" }}
      />
      {/* Price placeholder */}
      <Skeleton
        variant="text"
        width="50px"
        height={32}
        sx={{ mx: "auto", bgcolor: "grey.200" }}
      />
    </Box>
  );
};

export default ProductCardSkeleton;
