import { Box, Container, Fab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Ensure react-router-dom is installed

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Product } from "../types/Product";
import DynamicPLPHeader from "../components/DynamicPLPHeader";
import FilterSidebar from "../components/FilterSidebar";
import PLPGrid from "../components/PLPGrid";
import { productApi } from "../api/productApi";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();

  // Extract ALL parameters from the URL
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const certs = searchParams.get("certs");
  const diets = searchParams.get("diets");
  const sort = searchParams.get("sort") || "newest";

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build the params object.
        // We only add properties if they exist so we don't send "category=null" to Spring Boot.
        const queryParams: Record<string, any> = {};

        if (categoryParam) queryParams.category = categoryParam;
        if (searchParam) queryParams.search = searchParam;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
        if (certs) queryParams.certs = certs;
        if (diets) queryParams.diets = diets;
        if (sort) queryParams.sort = sort;
        // Note: We can add page and size here later when we wire up the "Load More" button!

        const response = await productApi.searchProducts(queryParams);

        // Spring Boot wraps the array in 'content' and the count in 'totalElements'
        setProducts(response.data.content);
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam, searchParam, minPrice, maxPrice, certs, diets, sort]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Navbar />
      <DynamicPLPHeader category={categoryParam} search={searchParam} />

      <Container maxWidth="lg">
        <Box sx={{ display: "flex", py: 6, position: "relative" }}>
          <FilterSidebar
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)}
          />

          <Box sx={{ flexGrow: 1, width: "100%", pl: { md: 4 } }}>
            <PLPGrid
              products={products}
              isLoading={isLoading}
              totalItems={totalItems}
            />
          </Box>
        </Box>
      </Container>

      <Footer />

      <Fab
        color="success"
        aria-label="filter"
        onClick={() => setIsMobileFilterOpen(true)}
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 4,
        }}>
        <FilterListIcon />
      </Fab>
    </Box>
  );
};

export default ProductListingPage;
