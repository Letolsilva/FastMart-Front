import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import { Register } from "../pages/Register";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};
