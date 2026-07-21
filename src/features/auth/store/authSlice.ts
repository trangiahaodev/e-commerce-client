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
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload as string; // Set the error message from Spring Boot
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
