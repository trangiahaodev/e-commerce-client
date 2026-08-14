import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import axiosClient from "../../../utils/axiosClient";
import { logout } from "../../auth/store/authSlice";
import { useToast } from "../../../context/ToastContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState("SEASONAL");
  const [searchInput, setSearchInput] = useState("");

  const categories = [
    "SEASONAL",
    "FRESH FRUITS",
    "LEAFY GREENS",
    "ROOT VEGETABLES",
    "DAIRY & EGGS",
    "ORGANIC MEAT",
  ];

  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      dispatch(logout());
      showToast("Logout successfully!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Background logout failed", error);
      showToast("An unexpected error occurred during logout", "error");
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Format category string (e.g., "DAIRY & EGGS" -> "dairy-eggs")
    const formattedCategory = category
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");

    navigate(`/products?category=${formattedCategory}`);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
          <Typography
            variant="h5"
            component={RouterLink}
            onClick={() => navigate("/")}
            to="/"
            sx={{
              fontWeight: 900,
              color: "success.dark",
              textDecoration: "none",
              letterSpacing: "-0.5px",
              minWidth: "200px",
            }}>
            GREENHARVEST
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              px: 4,
            }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search organic produce..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
              sx={{
                width: "100%",
                maxWidth: "500px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "grey.50",
                  "& fieldset": { borderColor: "grey.300" },
                  "&:hover fieldset": { borderColor: "success.main" },
                  "&.Mui-focused fieldset": { borderColor: "success.main" },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: "200px",
              justifyContent: "flex-end",
            }}>
            {isAuthenticated && user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}>
                  {user.sub ? user.sub.split("@")[0] : "User"}
                </Typography>
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  title="Logout"
                  sx={{ ml: 1 }}>
                  <LogoutOutlinedIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<PersonOutlineOutlinedIcon />}
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    color: "success.main",
                    backgroundColor: "transparent",
                  },
                }}>
                Login
              </Button>
            )}

            <IconButton
              sx={{
                color: "text.primary",
                "&:hover": { color: "success.main" },
              }}>
              <Badge badgeContent={0} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "grey.100",
          display: { xs: "none", md: "block" },
        }}>
        <Container maxWidth="lg">
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 5,
              minHeight: 46,
            }}>
            {categories.map((category) => (
              <Typography
                key={category}
                variant="caption"
                onClick={() => handleCategoryClick(category)}
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  position: "relative",
                  py: 1.5,
                  color:
                    activeCategory === category
                      ? "success.main"
                      : "text.secondary",
                  transition: "color 0.2s ease-in-out",
                  "&:hover": { color: "success.main" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    backgroundColor: "success.main",
                    width: activeCategory === category ? "100%" : "0%",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}>
                {category}
              </Typography>
            ))}
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Navbar;
