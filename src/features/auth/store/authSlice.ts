import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginRequest } from "../types/LoginRequest";
import axiosClient from "../../../utils/axiosClient";
import type { AuthState } from "../types/AuthState";
import { extractUserFromCookie } from "../utils/cookieUtils";

// This is the Thunk. It delays the API call until you dispatch it from your React component.
export const loginUser = createAsyncThunk(
  "auth/loginUser", // The string prefix
  async (credentials: LoginRequest, thunkAPI) => {
    try {
      const response = await axiosClient.post("/auth/login", credentials);
      return response.data; // This automatically becomes the payload for the 'fulfilled' action
    } catch (error: any) {
      // This forces the 'rejected' action to fire
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed!");
    }
  },
);

export const checkAuthSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    try {
      // This endpoint should read the cookie and return the user's info
      const response = await axiosClient.get("/auth/me");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No active session");
    }
  },
);

// Get user from cookie (just like get user from local storage)
// If the user hits refresh (F5), this automatically checks the secure cookie
// to keep them logged in seamlessly without storing anything in localStorage!
const initialUser = extractUserFromCookie();

const initialState: AuthState = {
  user: null,
  isAuthenticated: initialUser !== null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear old errors
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;

        // Extract cookie data on successful login
        const userProfile = extractUserFromCookie();
        if (userProfile) {
          state.user = userProfile;
          state.isAuthenticated = true;
        } else {
          state.status = "failed";
          state.error = "Security validation failed on client!";
        }
      })

      // Check session
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload as string; // Set the error message from Spring Boot
      })
      .addCase(checkAuthSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        // Populate the user state from the /auth/me response
        state.user = action.payload;
      })
      .addCase(checkAuthSession.rejected, (state) => {
        state.status = "idle"; // Reset to idle so the user can log in normally
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
