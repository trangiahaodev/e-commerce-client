import { Container } from "@mui/material";
import ProductRow from "./ProductRow";
import type { Product } from "./ProductCard";

const ProductShowcase = () => {
  const hotSales: Product[] = [
    {
      id: 1,
      name: "Organic Heirloom Tomatoes",
      category: "Fresh Veggies",
      price: 65000,
      imageUrl:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 2,
      name: "Free-Range Farm Eggs (12 Pack)",
      category: "Dairy & Eggs",
      price: 85000,
      imageUrl:
        "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 3,
      name: "VietGAP Certified Spinach",
      category: "Leafy Greens",
      price: 45000,
      imageUrl:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 4,
      name: "Sweet Dalat Strawberries",
      category: "Fresh Fruits",
      price: 120000,
      imageUrl:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=300",
    },
  ];

  const seasonalPicks: Product[] = [
    {
      id: 5,
      name: "Organic Hass Avocados",
      category: "Seasonal",
      price: 95000,
      imageUrl:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 6,
      name: "Fresh Harvest Sweet Corn",
      category: "Seasonal",
      price: 30000,
      imageUrl:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 7,
      name: "Premium Wagyu Beef Strips",
      category: "Organic Meat",
      price: 350000,
      imageUrl:
        "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 8,
      name: "Raw Wildflower Honey",
      category: "Pantry",
      price: 180000,
      imageUrl:
        "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ProductRow sectionTitle="HOT SALES" products={hotSales} />
      <ProductRow sectionTitle="SEASONAL PICKS" products={seasonalPicks} />
    </Container>
  );
};

export default ProductShowcase;
