import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";

import {
  fetchJustOneEmployee,
  updateEmployeeData,
} from "../../services/APIservices";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import { CPFInput } from "../../components/CPFInput";
import { useEffect, useState } from "react";
import { Employee } from "../ListEmployees";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  fetchJustOneEmployee,
  updateEmployeeData,
} from "../../services/ServicesEmployees";

export const ValidationUserEditSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  code: yup.string().required("Código é obrigatório"),
  birthday_date: yup.string().required("Data de nascimento é obrigatória"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Telefone deve ter 10 ou 11 dígitos")
    .required("Telefone é obrigatório"),
  education: yup.string().required("Educação é obrigatória"),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato xxx.xxx.xxx-xx"
    )
    .required("CPF é obrigatório"),
});

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = id ? parseInt(id, 10) : NaN;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      id: employeeId,
      name: "",
      email: "",
      code: 0,
      birthday_date: "",
      cpf: "",
      phone: "",
      education: "",
      is_logged: false,
      company_id: -1,
      createdAt: "",
      updatedAt: "",
    },
    validationSchema: ValidationUserEditSchema,
    onSubmit: async (values: Employee) => {
      try {
        await updateEmployeeData(values);
        toast.success("Dados atualizados com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar os dados.");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEmployee = await fetchJustOneEmployee(employeeId);
        if (fetchedEmployee) {
          const formattedDate = new Date(fetchedEmployee.birthday_date)
            .toISOString()
            .split("T")[0];

          setEmployee(fetchedEmployee);

          formik.setValues({
            id: fetchedEmployee.id,
            name: fetchedEmployee.name,
            email: fetchedEmployee.email,
            code: fetchedEmployee.code,
            birthday_date: formattedDate,
            cpf: fetchedEmployee.cpf,
            phone: fetchedEmployee.phone,
            education: fetchedEmployee.education,
            company_id: fetchedEmployee.company_id,
            is_logged: fetchedEmployee.is_logged,
            createdAt: fetchedEmployee.createdAt,
            updatedAt: fetchedEmployee.updatedAt,
          });
        }
      } catch (error) {
        setError("Erro ao carregar os dados do funcionário.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [employeeId]);


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

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header showIcon={true} backRoute="/lista-funcionarios" />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Editar Dados
          </h2>
          {employee ? (
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <TextInput
                title="Nome*"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                className={
                  formik.errors.name && formik.touched.name
                    ? "border-red-500 text-gray-700"
                    : "text-gray-700"
                }
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              )}
              <TextInput
                title="Email*"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                className={
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "text-gray-700"
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
              <DateInput
                title="Data de Nascimento*"
                placeholder=""
                value={formik.values.birthday_date}
                onChange={formik.handleChange}
                name="birthday_date"
                className={
                  formik.errors.birthday_date && formik.touched.birthday_date
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.birthday_date && formik.touched.birthday_date && (
                <p className="text-red-500 text-xs">
                  {formik.errors.birthday_date}
                </p>
              )}
              <CPFInput
                title="CPF*"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.cpf}
                name="cpf"
                className={
                  formik.errors.cpf && formik.touched.cpf
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.cpf && formik.touched.cpf && (
                <p className="text-red-500 text-xs ">{formik.errors.cpf}</p>
              )}
              <TextInput
                title="Telefone*"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.phone}
                name="phone"
                className={
                  formik.errors.phone && formik.touched.phone
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              )}
              <TextInput
                title="Educação*"
                placeholder=""
                onChange={formik.handleChange}
                value={formik.values.education}
                name="education"
                className={
                  formik.errors.education && formik.touched.education
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.education && formik.touched.education && (
                <p className="text-red-500 text-xs">
                  {formik.errors.education}
                </p>
              )}
              <p className="text-gray-700">
                <strong className="p-1">Criado em: </strong>{" "}
                {new Date(employee.createdAt).toLocaleDateString()}
                <strong className="p-1"> - Atualizado em:</strong>{" "}
                {new Date(employee.updatedAt).toLocaleDateString()}
              </p>
              <button
                type="submit"
                className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
              >
                Atualizar
              </button>
            </form>
          ) : (
            <p>Funcionário não encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
