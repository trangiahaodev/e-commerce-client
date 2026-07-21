import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import axiosClient from "../../../utils/axiosClient";
import { logout } from "../../auth/store/authSlice";
import { useEffect, useState } from "react";
import { useToast } from "../../../context/ToastContext";

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
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-orange-600 tracking-tight">
        GREENHARVEST
      </Link>

      {/* Auth State Rendering */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, <span className="font-bold">{user.sub || "User"}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-orange-600 transition-colors">
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-gray-700 hover:text-orange-600 transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
