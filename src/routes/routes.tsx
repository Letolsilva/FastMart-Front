import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import { SignUp } from "../pages/SignUp";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};
