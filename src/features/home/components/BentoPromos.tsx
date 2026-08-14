import { Grid, Container } from "@mui/material";
import PromoCard from "./PromoCard";

const BentoPromos = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        {/* Left Side: Tall Main Promo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PromoCard
            height={{ xs: "300px", md: "524px" }}
            title="THE SUMMER HARVEST"
            subtitle="Shop seasonal picks"
            bgImage="https://images.unsplash.com/photo-1596199050105-6d5d32222916?auto=format&fit=crop&q=80"
          />
        </Grid>

        {/* Right Side: The 3 Smaller Promos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6 }}>
              <PromoCard
                height="250px"
                title="FRUITS"
                subtitle="Freshly picked"
                bgImage="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80"
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <PromoCard
                height="250px"
                title="MEATS"
                subtitle="Pasture raised"
                bgImage="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <PromoCard
                height="250px"
                title="MEAL PREP KITS"
                subtitle="Farm to table combos"
                bgImage="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BentoPromos;
