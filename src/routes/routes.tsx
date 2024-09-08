import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { Register } from "../pages/RegisterEmployees";
import { Login } from "../pages/Login";
import EmployeesList from "../pages/ListEmployees";
import EmployeeDetails from "../pages/DetailsEmployee";
import EditPage from "../pages/Edit";
<<<<<<< Updated upstream
import { RegisterProduct } from "../pages/RegisterProduct";
=======
import EditProduct from "../pages/Products/EditProducts";

import { RegisterProduct } from "../pages/Products/RegisterProduct";
import ProductsList from "../pages/Products/ListProducts";
import ProductDetails from "../pages/Products/DetailsProducts";
import EditCompanyPage from "../pages/Company/Edit";
>>>>>>> Stashed changes

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lista-funcionarios" element={<EmployeesList />} />
      <Route path="/dados-funcionario/:id" element={<EmployeeDetails />} />
      <Route path="/edit/:id" element={<EditPage />} />
<<<<<<< Updated upstream
=======
      <Route path="/editar-produto/:id" element = {<EditProduct/>} />
      <Route path="/lista-produtos" element={<ProductsList />} />
      <Route path="/dados-products/:id" element={<ProductDetails />} />

      <Route path="/edit/company" element={<EditCompanyPage />} />
>>>>>>> Stashed changes
    </Routes>
  );
};
