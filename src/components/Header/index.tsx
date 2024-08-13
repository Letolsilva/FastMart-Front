import React, { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import purpleIcon from "/purple-icon.png";
import { fetchEmployees, PostLogout } from "../../services/ServicesEmployees";
import { Employee } from "../../pages/ListEmployees";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";

interface HeaderProps {
  showIcon?: boolean;
  backRoute?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showIcon = false,
  backRoute,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loggedInEmployee, setLoggedInEmployee] = useState<Employee | null>(
    null
  );
  const navigate = useNavigate();
  const authUser = useAuthUser();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = authUser();
        const userEmail = user?.email;
        if (userEmail) {
          const employees = await fetchEmployees();
          const loggedUser = employees.find((emp) => emp.email === userEmail);
          setLoggedInEmployee(loggedUser || null);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleLogout = async () => {
    const userEmail = authUser()?.email;
    toast.success(`Usuário com email ${userEmail} deslogado.`);
    setRedirect(true);
    if (loggedInEmployee) {
      console.log(loggedInEmployee.id);
      await PostLogout(loggedInEmployee.id, navigate);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  return (
    <header className="relative z-50 bg-white border-b border-gray-300 shadow-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        {showIcon && backRoute && (
          <BiChevronLeft
            size={24}
            className="text-gray-500 mr-4 cursor-pointer hover:text-gray-700"
            onClick={() => navigate(backRoute)}
          />
        )}
        <div className="flex items-center justify-center flex-grow hover:animate-pulse">
          <img
            src={purpleIcon}
            className="w-12 h-10 transition-transform duration-200 transform hover:scale-110 cursor-pointer"
            alt="Purple Icon"
          />
          <strong className="text-2xl font-bold ml-5 text-purple-900 transition-transform duration-200 transform">
            FastMart
          </strong>
        </div>
      </div>
      <div className="relative">
        <button
          className="text-secondary-300 rounded-full p-4 flex items-center transition-transform duration-200 transform hover:text-purple-900 hover:-translate-y-1"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FiUser size={24} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2">
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
