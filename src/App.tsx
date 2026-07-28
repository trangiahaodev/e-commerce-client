import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./config/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CatalogPage from "./features/catalog/pages/CatalogPage";
import HomePage from "./features/home/pages/HomePage";
import { useAppDispatch } from "./hooks/reduxHooks";
import { useEffect, useState } from "react";
import { checkAuthSession } from "./features/auth/store/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  // 1. Redux
  const dispatch = useAppDispatch();

  // 2. Local state to check initial state
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // As soon as the app mounts, check if the browser has a valid session
    dispatch(checkAuthSession())
      .unwrap()
      .catch(() => {
        // We can safely ignore the error here; it just means they aren't logged in.
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, [dispatch]);

  if (isInitializing) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingSpinner fullScreen message="Loading data..." size={60} />
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline: Reset default CSS of browser to synchronize with MUI */}
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/catalog" element={<CatalogPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/checkout"
                element={<div>Checkout Page (Protected)</div>}
              />
              <Route
                path="/profile"
                element={<div>User Profile (Protected)</div>}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
