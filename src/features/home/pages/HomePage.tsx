import { useAppDispatch } from "../../../hooks/reduxHooks";
import axiosClient from "../../../utils/axiosClient";
import { logout } from "../../auth/store/authSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // 1. Send the network request to wipe the server DB and browser cookies
      await axiosClient.post("/auth/logout");

      // 2. Instantly wipe Redux state. The UI will react immediately
      dispatch(logout());
    } catch (error) {
      console.error("Background logout failed", error);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default HomePage;
