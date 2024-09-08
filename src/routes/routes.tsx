import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { Register } from "../pages/RegisterEmployees";
import { Login } from "../pages/Login";
import EmployeesList from "../pages/ListEmployees";
import EmployeeDetails from "../pages/DetailsEmployee";
import EditPage from "../pages/Edit";
import EditProduct from "../pages/Products/EditProducts";
import { RegisterProduct } from "../pages/Products/RegisterProduct";
import ProductsList from "../pages/Products/ListProducts";
import ProductDetails from "../pages/Products/DetailsProducts";
import EditCompanyPage from "../pages/Company/Edit";
import { Sales } from "../pages/Sales";
import { CancelSale } from "../pages/CancelSale";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registrar-produto" element={<RegisterProduct />} />
      <Route path="/lista-funcionarios" element={<EmployeesList />} />
      <Route path="/dados-funcionario/:id" element={<EmployeeDetails />} />
      <Route path="/edit/:id" element={<EditPage />} />

      <Route path="/editar-produto/:id" element={<EditProduct />} />
      <Route path="/lista-produtos" element={<ProductsList />} />
      <Route path="/dados-products/:id" element={<ProductDetails />} />

      <Route path="/edit/company" element={<EditCompanyPage />} />

      <Route path="/product/list" element={<ProductsList />} />
      <Route path="/dados-products/:id" element={<ProductDetails />} />
      <Route path="/cancel-sale" element={<CancelSale />} />

      <Route path="/edit/company" element={<EditCompanyPage />} />
    </Routes>
  );
};
