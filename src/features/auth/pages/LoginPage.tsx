import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { loginUser } from "../store/authSlice";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const LoginPage = () => {
  // 1. Local UI state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Redux hooks to dispatch actions
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  // 3. Navigation
  const navigate = useNavigate();

  // 4. Toast
  const { showToast } = useToast();

  // 5. Logic handler
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();

        setEmail("");
        setPassword("");

        navigate("/");
      } catch (rejectedValue) {
        // Use the rejectedValue directly from the unwrap() promise,
        // not the stale Redux 'error' state!
        showToast(
          (rejectedValue as string) ||
            "An unexpected error occurred during login.",
          "error",
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // Clean light gray background
      }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={status === "loading"}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={status === "loading"}
            sx={{ marginTop: 3 }}>
            {/* 6. Conditional Rendering for the loading spinner */}
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
