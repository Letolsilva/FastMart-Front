import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const isAuthenticated = () => {
  return localStorage.getItem('authToken') ? true : false;
};

const get_type_user = () => {
  const input = localStorage.getItem('code');
  if (input === "0") return "Administrador";
  if (input === "1") return "Caixa";
  if (input === "2") return "Estoquista";
  if (input === "3") return "RH";
  if (input === "4") return "Marketing";
  return "default";
};

export const PrivateRoute = ({ requiredRoles }: { requiredRoles?: string[] }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [role, setRole] = useState(get_type_user());

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setRole(get_type_user());
  }, []);

  if (!isAuth) {
    return <Navigate to="/acesso-negado" />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to="/acesso-negado" />;
  }

  return <Outlet />;
};
