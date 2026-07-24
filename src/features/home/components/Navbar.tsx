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
  Divider,
  Button,
} from "@mui/material";

const Navbar = () => {
  // 1. Redux hooks
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 2. Toast
  const { showToast } = useToast();

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
      sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand */}
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 800,
            color: "success.dark", // Green harvest theme
            textDecoration: "none",
            letterSpacing: "-0.5px",
            "&:hover": { color: "success.main" },
          }}>
          GREEN HARVEST
        </Typography>

        {/* Navigation & Auth Area */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated && user ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "grey.50",
                px: 2,
                py: 0.5,
                borderRadius: 5,
                border: "1px solid",
                borderColor: "grey.200",
              }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Welcome,
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    marginLeft: "4px",
                  }}>
                  {user.sub ? user.sub.split("@")[0] : "User"}
                </Box>
              </Typography>

              {/* Vertical Divider */}
              <Divider orientation="vertical" flexItem sx={{ my: 1, mx: 2 }} />

              {/* Logout Button */}
              <Button
                size="small"
                color="error"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="success"
              sx={{
                borderRadius: 5,
                px: 3,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 0,
              }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
