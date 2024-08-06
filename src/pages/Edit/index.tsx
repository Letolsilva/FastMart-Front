import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";
import { fetchJustOneEmployee } from "../../services/APIservices";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import { CPFInput } from "../../components/CPFInput";
import { updateEmployeeData } from "../../services/APIservices";
import { useEffect, useState } from "react";
import { Employee } from "../ListEmployees";
import * as yup from "yup";
import { toast } from "react-toastify";

const EditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const employeeId = id ? parseInt(id, 10) : NaN;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const phoneRegex = /^(?:\(\d{2}\)\s?\d{5}-\d{4}|\d{11})$/;
    const cpfRegex = /^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2}|\d{9}-\d{2})$/; // Aceita três formatos de CPF

    const RegisterSchema = yup.object().shape({
        name: yup.string().required("Nome é obrigatório"),
        email: yup.string().email("Email inválido").required("Email é obrigatório"),
        code: yup.string().required("Código é obrigatório"),
        birthday_date: yup.string().required("Data de nascimento é obrigatória"),
        phone: yup.string().matches(phoneRegex, "Telefone inválido").required("Telefone é obrigatório"),
        education: yup.string().required("Educação é obrigatória"),
        cpf: yup.string().matches(cpfRegex, "CPF inválido").required("CPF é obrigatório"),
    });

    useEffect(() => {
        const loadEmployee = async () => {
            try{
                if(!isNaN(employeeId)){
                    const data = await fetchJustOneEmployee(employeeId);
                    setEmployee(data);
                }
            } 
            catch(error){
                setError("Erro ao buscar dados da API");
            } 
            finally{
                setLoading(false);
            }
        };
        loadEmployee();
    }, [employeeId]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => {
            if (!prevEmployee) return null;
            return { ...prevEmployee, [name]: value };
        });
    };
   
    const handleSubmit = async () => {
        if (employee) {
            try {
                await RegisterSchema.validate(employee, { abortEarly: false });
                await updateEmployeeData(employee);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    toast.error(`${err.errors.join(", ")}`);
                } else {
                    toast.error("Erro ao atualizar os dados.");
                }
            }
        }
    };
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return(
        <div className="relative min-h-screen bg-gray-100">
            <Header showIcon={true} backRoute="/lista-funcionarios" />
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary"> Editar Dados</h2>
                    {employee ? (
                        <div className="space-y-4">
                            <TextInput className="text-gray-700"
                                title="Nome:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={employee.name}
                                name="name"
                            />
                            <TextInput className="text-gray-700"
                                title="Email:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={employee.email}
                                name="email"
                            />
                            <DateInput
                                title="Data de Nascimento:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={formatDate(employee.birthday_date)}
                                name="birthday_date"
                               
                            />
                            <CPFInput
                                title="CPF:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={employee.cpf}
                                name="cpf"
                            />
                            <TextInput
                                title="Telefone:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={employee.phone}
                                name="phone"
                            />
                            <TextInput 
                                title="Educação:"
                                placeholder=""
                                onChange={handleInputChange}
                                value={employee.education}
                                name="education"
                            />
                            <p className="text-gray-700">
                                <strong>Criado em:</strong>{" "}
                                {new Date(employee.createdAt).toLocaleDateString()}
                                <strong>- Atualizado em:</strong>{" "}
                                {new Date(employee.updatedAt).toLocaleDateString()}
                            </p>
                            <br/>
                        </div>
                    ) : (
                        <p>Funcionário não encontrado.</p>
                    )}
                    <button
                        type="submit"
                        className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
                        onClick={handleSubmit}
                    >
                        Atualizar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
