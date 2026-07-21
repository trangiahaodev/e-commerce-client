import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Dòng này tự động quét toàn bộ kho và tạo ra một Type tổng hợp
export type RootState = ReturnType<typeof store.getState>;

// Dòng này lấy ra Type của hàm dispatch chuẩn
export type AppDispatch = typeof store.dispatch;
