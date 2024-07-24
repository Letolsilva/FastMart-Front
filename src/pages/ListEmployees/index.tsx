import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import { fetchEmployees } from "../../services/APIservices";
import SearchBar from "../../components/SearchBar";

export interface Employee {
  id: number;
  name: string;
  email: string;
  code: number;
  birthday_date: string;
  cpf: string;
  phone: string;
  education: string;
  is_logged: boolean;
  createdAt: string;
  updatedAt: string;
}

const EmployeesList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        setError("Erro ao buscar dados da API");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <Header showIcon={true} backRoute="/main" />
      <div className="border border-gray-300 p-10 rounded-lg shadow-md mt-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-800">
            Funcionários Cadastrados
          </h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Pesquisar Funcionário"
          />
        </div>
        <ul className="space-y-2">
          {filteredEmployees.map((employee) => (
            <Link
              key={employee.id}
              to={`/dados-funcionario/${employee.id}`}
              className="block"
            >
              <li className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                {employee.name}
                <div className="flex space-x-5">
                  <button className="text-neutral-500 hover:text-purple-800">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-neutral-500 hover:text-purple-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeesList;
