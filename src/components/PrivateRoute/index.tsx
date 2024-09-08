import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated);

  useEffect(() => {
    // Sempre que o localStorage for atualizado, verifica o estado de autenticação
    const token = localStorage.getItem('authToken');
    setIsAuth(!!token);
  }, [isAuthenticated]);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
