import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { Register } from "../pages/RegisterEmployees";
import { Login } from "../pages/Login";
import EmployeesList from "../pages/ListEmployees";
import EmployeeDetails from "../pages/DetailsEmployee";
import EditPage from "../pages/Edit";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lista-funcionarios" element={<EmployeesList />} />
      <Route path="/dados-funcionario/:id" element={<EmployeeDetails />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
};
