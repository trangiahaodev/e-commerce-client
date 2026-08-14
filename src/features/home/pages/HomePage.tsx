import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { fetchProduct } from "../store/productSlice";
import HeroBanner from "../components/HeroBanner";
import BentoPromos from "../components/BentoPromos";
import ProductShowcase from "../components/ProductShowcase";
import TrustSignals from "../components/TrustSignals";
import Footer from "../components/Footer";
import type { Product } from "../types/Product";
import ProductRow from "../components/ProductRow";

const HomePage = () => {
  // Local state to hold the data for each specific curated row
  const [trending, setTrending] = useState<Product[]>([]);
  const [seasonal, setSeasonal] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [topRated, setTopRated] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCuratedProducts = async () => {
      try {
        setIsLoading(true);

        const [trendingRes, seasonalRes, recommendedRes, topRatedRes] =
          await Promise.all([
            fetch("http://localhost:8686/api/v1/products/trending"),
            fetch("http://localhost:8686/api/v1/products/seasonal"),
            fetch("http://localhost:8686/api/v1/products/recommended"),
            fetch("http://localhost:8686/api/v1/products/top-rated"),
          ]);

        const [trendingData, seasonalData, recommendedData, topRatedData] =
          await Promise.all([
            trendingRes.json(),
            seasonalRes.json(),
            recommendedRes.json(),
            topRatedRes.json(),
          ]);

        // PASS THE DATA DIRECTLY, NO MAPPING REQUIRED
        setTrending(trendingData);
        setSeasonal(seasonalData);
        setRecommended(recommendedData);
        setTopRated(topRatedData);
      } catch (error) {
        console.error("Failed to fetch product rows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCuratedProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Navbar />
      <HeroBanner />
      <BentoPromos />

      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          {!isLoading && (
            <>
              <ProductRow
                sectionTitle="TRENDING HARVESTS"
                products={trending}
              />
              <ProductRow sectionTitle="SEASONAL PICKS" products={seasonal} />
              <ProductRow
                sectionTitle="CURATED FOR YOU"
                products={recommended}
              />
              <ProductRow
                sectionTitle="COMMUNITY FAVORITES"
                products={topRated}
              />
            </>
          )}
        </Container>
      </Box>

      <TrustSignals />
      <Footer />
    </Box>
  );
};

export default HomePage;
