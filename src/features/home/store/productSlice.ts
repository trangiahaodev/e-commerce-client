import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../types/ProductState";
import axiosClient from "@/utils/axiosClient";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/products");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Fetching products failed");
    }
  },
);

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
