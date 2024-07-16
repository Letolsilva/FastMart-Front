import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage";
import { SignUp } from "../pages/SignUp";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
