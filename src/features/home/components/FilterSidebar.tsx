import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Drawer,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterSidebar = ({ isMobileOpen, onMobileClose }: FilterSidebarProps) => {
  // 1. URL Params
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Parse initial state from the URL (falling back to defaults)
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
  const selectedCerts = searchParams.get("certs")?.split(",") || [];
  const selectedDiets = searchParams.get("diets")?.split(",") || [];

  // Local state for the slider so the handle doesn't lag while dragging
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  // Sync the local slider state if the URL changes externally (e.g., clearing filters)
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Helper to safely update URL params without wiping out others (like ?category=)
  const updateUrlParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  // 3. Handlers
  const handlePriceDrag = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]); // Only updates UI
  };

  const handlePriceDrop = (
    event: Event | React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    const [min, max] = newValue as number[];
    const newParams = new URLSearchParams(searchParams);

    // Update the URL when the user releases the slider
    newParams.set("minPrice", min.toString());
    newParams.set("maxPrice", max.toString());
    setSearchParams(newParams);
  };

  const handleCertChange = (cert: string, isChecked: boolean) => {
    let newCerts = [...selectedCerts];
    if (isChecked) {
      newCerts.push(cert);
    } else {
      newCerts = newCerts.filter((c) => c !== cert);
    }
    updateUrlParams("certs", newCerts.length > 0 ? newCerts.join(",") : null);
  };

  const handleDietChange = (diet: string, isChecked: boolean) => {
    let newDiets = [...selectedDiets];
    if (isChecked) {
      newDiets.push(diet);
    } else {
      newDiets = newDiets.filter((d) => d !== diet);
    }
    updateUrlParams("diets", newDiets.length > 0 ? newDiets.join(",") : null);
  };

  const handleClearAll = () => {
    const newParams = new URLSearchParams(searchParams);
    // Specifically delete filter params, but keep search/category params intact
    newParams.delete("minPrice");
    newParams.delete("maxPrice");
    newParams.delete("certs");
    newParams.delete("diets");
    setSearchParams(newParams);
  };

  // 4. The Rendered Content
  const filterContent = (
    <Box sx={{ width: 280, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1 }}>
          FILTERS
        </Typography>
        <Button
          onClick={handleClearAll}
          size="small"
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
          }}>
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 2, textTransform: "uppercase" }}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceDrag}
          onChangeCommitted={handlePriceDrop}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          step={50000}
          color="success"
          sx={{ mb: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "text.secondary",
          }}>
          <Typography variant="body2">{`$${priceRange[0]}`}</Typography>
          <Typography variant="body2">{`$${priceRange[1]}`}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Certifications */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 2, textTransform: "uppercase" }}>
          Certifications
        </Typography>
        <FormGroup>
          {["USDA Organic", "VietGAP", "GlobalGAP"].map((cert) => (
            <FormControlLabel
              key={cert}
              control={
                <Checkbox
                  size="small"
                  color="success"
                  checked={selectedCerts.includes(cert)}
                  onChange={(e) => handleCertChange(cert, e.target.checked)}
                />
              }
              label={<Typography variant="body2">{cert}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Dietary Preferences */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 2, textTransform: "uppercase" }}>
          Dietary
        </Typography>
        <FormGroup>
          {["Gluten-Free", "Vegan", "Keto"].map((diet) => (
            <FormControlLabel
              key={diet}
              control={
                <Checkbox
                  size="small"
                  color="success"
                  checked={selectedDiets.includes(diet)}
                  onChange={(e) => handleDietChange(diet, e.target.checked)}
                />
              }
              label={<Typography variant="body2">{diet}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}>
        {filterContent}
      </Drawer>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          borderRight: "1px solid",
          borderColor: "grey.200",
          height: "100%",
          minHeight: "calc(100vh - 200px)",
        }}>
        {filterContent}
      </Box>
    </Box>
  );
};

export default FilterSidebar;
