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
  // 1. Redux hooks
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 2. Toast
  const { showToast } = useToast();

  // 3. Local state to track the clicked category
  const [activeCategory, setActiveCategory] = useState("SEASONAL");

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
      // 1. Delete browser cookies
      await axiosClient.post("/auth/logout");

      // 2. Delete Redux state
      dispatch(logout());

      // 3. Toast
      showToast("Logout successfully!", "success");

      // 4. Redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Background logout failed", error);
      showToast("An unexpected error occurred during logout", "error");
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
      {/* Primary Toolbar: Logo, Search, and User Actions */}
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
          {/* 1. Brand Logo */}
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

          {/* 2. Centered Search Bar */}
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
              sx={{
                width: "100%",
                maxWidth: "500px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Pill-shaped search bar
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

          {/* 3. Navigation & Auth Area */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: "200px",
              justifyContent: "flex-end",
            }}>
            {/* User Account / Login */}
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

            {/* Shopping Cart */}
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

      {/* Secondary Toolbar: Categories */}
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
                onClick={() => setActiveCategory(category)}
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  position: "relative",
                  py: 1.5, // Padding top and bottom
                  color:
                    activeCategory === category
                      ? "success.main"
                      : "text.secondary",
                  transition: "color 0.2s ease-in-out",
                  "&:hover": { color: "success.main" },
                  // Green line indicator
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0, // Pins it to the bottom of the padding
                    left: 0,
                    height: "2px",
                    backgroundColor: "success.main",
                    // The line is 100% width if active, or scales up on hover
                    width: activeCategory === category ? "100%" : "0%",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%", // Shows line on hover before clicking
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
