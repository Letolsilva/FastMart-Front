{
  /* Cadastra funcionário */
}
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../../components/TextInput";
import { DateInput } from "../../../components/DateInput";
import { CPFInput } from "../../../components/CPFInput";
import { CreateUser } from "../../../services/ServicesEmployees";
import { Header } from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfession } from "../../MainPage";
import { SelectInput } from "../../../components/SelectInput";

export const ValidationUserSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  code: yup.string().required("Código é obrigatório"),
  birthday_date: yup.string().required("Data de nascimento é obrigatória"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Telefone deve ter 10 ou 11 dígitos")
    .required("Telefone é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
  education: yup.string().required("Educação é obrigatória"),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato xxx.xxx.xxx-xx"
    )
    .required("CPF é obrigatório"),
});

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [profession, setProfession] = useState<string>("");
  const company_id = localStorage.getItem("company_id");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      code: "",
      birthday_date: "",
      cpf: "",
      phone: "",
      education: "",
      company_id: String(company_id),
    },
    validationSchema: ValidationUserSchema,
    onSubmit: async (values) => {
      try {
        await CreateUser(values);
        formik.resetForm();
        toast.success("Funcionário cadastrado com sucesso");
        navigate("/main");
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
      }
    },
  });

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    formik.handleChange(e); // Manter o controle do Formik
    setProfession(getProfession(Number(selectedCode))); // Atualizar a profissão
  };

  return (
    <div>
      <Header showIcon={true} backRoute="/main" />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Cadastro Funcionário
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <TextInput
                title="Nome*"
                placeholder="Digite seu nome"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                className={
                  formik.errors.name && formik.touched.name
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.name}
                </p>
              )}

              <TextInput
                title="Email*"
                placeholder="Digite seu email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className={
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.email}
                </p>
              )}

              <TextInput
                title="Senha*"
                placeholder="Digite sua senha"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                className={
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.password}
                </p>
              )}
              <SelectInput
                title="Código do Funcionário*"
                placeholder="Código do funcionário"
                value={formik.values.code}
                onChange={handleCodeChange}
                onBlur={formik.handleBlur}
                name="code"
                className={
                  formik.errors.code && formik.touched.code
                    ? "border-red-500"
                    : ""
                }
                options={[0, 1, 2, 3, 4]}
              />
              {formik.errors.code && formik.touched.code && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.code}
                </p>
              )}
              {profession && (
                <p className="text-sm text-purple-700">
                  Profissão: {profession}
                </p>
              )}
            </div>
            <div>
              <DateInput
                title="Data de Nascimento*"
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
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.birthday_date}
                </p>
              )}
              <CPFInput
                title="CPF*"
                placeholder="Digite seu CPF"
                value={formik.values.cpf}
                onChange={formik.handleChange}
                name="cpf"
                className={
                  formik.errors.cpf && formik.touched.cpf
                    ? "border-red-500"
                    : ""
                }
              />

              {formik.errors.cpf && formik.touched.cpf && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.cpf}
                </p>
              )}

              <TextInput
                title="Telefone*"
                placeholder="Digite seu telefone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
                className={
                  formik.errors.phone && formik.touched.phone
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.phone}
                </p>
              )}

              <TextInput
                title="Educação*"
                placeholder="Digite seu nível de educação"
                value={formik.values.education}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="education"
                className={
                  formik.errors.education && formik.touched.education
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.education && formik.touched.education && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.education}
                </p>
              )}
            </div>
            <div className="col-span-2 -mt-6 flex justify-center">
              <TextInput
                title="ID da Empresa*"
                placeholder="ID da empresa"
                value={formik.values.company_id}
                onBlur={formik.handleBlur}
                name="company_id"
                className={`w-full ${
                  formik.errors.company_id && formik.touched.company_id
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.errors.company_id && formik.touched.company_id && (
              <p className="col-span-2 text-red-500 text-xs -mt-3 mb-3 text-center">
                {formik.errors.company_id}
              </p>
            )}
            <button
              type="submit"
              className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
