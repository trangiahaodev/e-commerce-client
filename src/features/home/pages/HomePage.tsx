import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import BentoPromos from "../components/BentoPromos";
import TrustSignals from "../components/TrustSignals";
import Footer from "../components/Footer";
import type { Product } from "../types/Product";
import ProductRow from "../components/ProductRow";
import { productApi } from "../api/productApi";

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

        // Fire the Axios requests concurrently
        const [trendingRes, seasonalRes, recommendedRes, topRatedRes] =
          await Promise.all([
            productApi.getTrending(),
            productApi.getSeasonal(),
            productApi.getRecommended(),
            productApi.getTopRated(),
          ]);

        setTrending(trendingRes.data);
        setSeasonal(seasonalRes.data);
        setRecommended(recommendedRes.data);
        setTopRated(topRatedRes.data);
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
