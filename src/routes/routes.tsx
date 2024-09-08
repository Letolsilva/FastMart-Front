{
  /* ROTAS */
}
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { Register } from "../pages/Employees/RegisterEmployees";
import { Login } from "../pages/Login";
import EmployeesList from "../pages/Employees/ListEmployees";
import EmployeeDetails from "../pages/Employees/DetailsEmployee";
import EditPage from "../pages/Employees/Edit";
import NegatedAcess from "../pages/NegatedAcess";
import EditProduct from "../pages/Products/EditProducts";
import { RegisterProduct } from "../pages/Products/RegisterProduct";
import ProductsList from "../pages/Products/ListProducts";
import ProductDetails from "../pages/Products/DetailsProducts";
import EditCompanyPage from "../pages/Company/Edit";
import { Sales } from "../pages/Finances/Sales";
import { CancelSale } from "../pages/Finances/CancelSale";
import { PrivateRoute } from "../components/PrivateRoute";
import { Analysis } from "../pages/Finances/DataAnalysis";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rota protegida da Main */}
      <Route
        element={
          <PrivateRoute
            requiredRoles={[
              "Administrador",
              "Caixa",
              "Estoquista",
              "RH",
              "Marketing",
            ]}
          />
        }
      >
        <Route path="/main" element={<MainPage />} />
      </Route>

      {/* Rota protegida para Registrar Vendas */}
      <Route
        element={<PrivateRoute requiredRoles={["Administrador", "Caixa"]} />}
      >
        <Route path="/sales" element={<Sales />} />
      </Route>

      {/* Rota protegida para Registrar, Listar e Editar Produto */}
      <Route
        element={
          <PrivateRoute requiredRoles={["Administrador", "Estoquista"]} />
        }
      >
        <Route path="/registrar-produto" element={<RegisterProduct />} />
        <Route path="/lista-produtos" element={<ProductsList />} />
        <Route path="/dados-products/:id" element={<ProductDetails />} />
        <Route path="/editar-produto/:id" element={<EditProduct />} />
      </Route>

      {/* Rota protegida para Registrar, Listar e Editar Funcionario */}
      <Route element={<PrivateRoute requiredRoles={["Administrador", "RH"]} />}>
        <Route path="/register" element={<Register />} />
        <Route path="/lista-funcionarios" element={<EmployeesList />} />
        <Route path="/dados-funcionario/:id" element={<EmployeeDetails />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Route>

      {/* Rota protegida para Analise de dados */}
      <Route
        element={
          <PrivateRoute requiredRoles={["Administrador", "Marketing"]} />
        }
      ></Route>

      {/* Rota protegida para Administrador */}
      <Route element={<PrivateRoute requiredRoles={["Administrador"]} />}>
        <Route path="/edit/company" element={<EditCompanyPage />} />
        <Route path="/cancel-sale" element={<CancelSale />} />
      </Route>

      <Route path="/acesso-negado" element={<NegatedAcess />} />
      <Route path="/analise-dados" element={<Analysis />} />
    </Routes>
  );
};
