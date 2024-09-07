import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { fetchEmployees } from "../../services/ServicesEmployees";
import { Employee } from "../ListEmployees";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (employees.length > 0) {
      const foundEmployee = employees.find((emp) => emp.id === parseInt(id!));
      setEmployee(foundEmployee || null);
    }
  }, [employees, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showIcon={true} backRoute="/lista-funcionarios" />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">
            Detalhes do Funcionário
          </h1>
          {employee ? (
            <div className="space-y-6">
              <p className="text-gray-800">
                <strong>Nome:</strong> {employee.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {employee.email}
              </p>
              <p className="text-gray-700">
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(employee.birthday_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>CPF:</strong> {employee.cpf}
              </p>
              <p className="text-gray-700">
                <strong>Telefone:</strong> {employee.phone}
              </p>
              <p className="text-gray-700">
                <strong>Educação:</strong> {employee.education}
              </p>
              <p className="text-gray-700">
                <strong>ID Empresa:</strong> {employee.company_id}
              </p>
              <p className="text-gray-700">
                <strong>Criado em:</strong>{" "}
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Atualizado em:</strong>{" "}
                {new Date(employee.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Funcionário não encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
