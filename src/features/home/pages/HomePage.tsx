import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchProduct } from "../store/productSlice";

const HomePage = () => {
  // 1. Redux hooks
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") {
      try {
        dispatch(fetchProduct()).unwrap();
      } catch (error: any) {
        console.error("Failed to fetch products:", error.message);
      }
    }
  }, [dispatch, status]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "grey.50", minHeight: "100vh" }}>
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero section */}
      <Box
        sx={{
          bgcolor: "success.main",
          color: "white",
          py: { xs: 8, md: 12 },
          px: 2,
          textAlign: "center",
          backgroundImage: "linear-gradient(to right bottom, #2e7d32, #1b5e20)",
        }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 900, letterSpacing: "-1px" }}>
            Farm Fresh to Your Door
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Experience the best of nature with our hand-picked, organic produce
            delivered daily.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="warning"
            sx={{ fontWeight: "bold", px: 4, py: 1.5, borderRadius: 8 }}>
            Shop Seasonal Picks
          </Button>
        </Container>
      </Box>

      {/* 3. Product Grid Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: "800" }}>
            Fresh Arrivals
          </Typography>
          <Button color="success" sx={{ fontWeight: "bold" }}>
            View All
          </Button>
        </Box>

        <Grid container spacing={4}>
          {status === "loading" && <CircularProgress color="success" />}

          {status === "failed" && (
            <Typography color="error">{error}</Typography>
          )}

          {products?.map((product) => (
            <Grid key={product.productId} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}>
                {/* Image Placeholder */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.productName}
                  />
                  <Chip
                    label="Organic"
                    color="success"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Freshly harvested and inspected for quality.
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                    }}>
                    <Typography
                      variant="h6"
                      color="success.main"
                      sx={{ fontWeight: "bold" }}>
                      {product.basePrice}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="success"
                    sx={{ fontWeight: "bold", borderRadius: 2 }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
