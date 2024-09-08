import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { toast } from "react-toastify";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { forgotPassword } from "../../services/ServicesEmployees";

const API_URL = "http://localhost:3334";

const LoginSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

const ForgotPasswordSchema = yup.object().shape({
  cpf: yup.string().required("CPF é obrigatório"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  newPassword: yup.string().required("Nova senha é obrigatória"),
});

export const Login: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (data: {
    email: string;
    password: string;
    company_id: number;
    code: number;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, data);
      if (response.status === 200) {
        const { token } = response.data;
        const { company_id, code } = response.data.user;

        localStorage.setItem("authToken", token);
        localStorage.setItem("company_id", company_id);
        localStorage.setItem("code", code);
        toast.success("Usuário logado com sucesso!");

        signIn({
          token: token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: data.email },
        });

        navigate("/main");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("E-mail ou senha incorretos!");
          } else if (error.response.status === 403) {
            toast.error("Usuário já logado!");
          } else if (error.response.status === 404) {
            toast.error("Usuário inexistente!");
          }
        } else {
          toast.error("Erro ao buscar dados da API");
        }
      }
      throw error;
    }
  };

  const handleForgotPassword = async (values: {
    cpf: string;
    birthDate: string;
    newPassword: string;
  }) => {
    const company_id = 1;

    try {
      await forgotPassword(
        values.cpf,
        values.birthDate,
        values.newPassword,
        company_id,
        navigate
      );
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      company_id: -1,
      code: -1,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      handleLogin({
        email: values.email,
        password: values.password,
        company_id: values.company_id,
        code: values.code,
      });
    },
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      cpf: "",
      birthDate: "",
      newPassword: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      handleForgotPassword(values);
    },
  });

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Login
          </h2>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1">
            <div>
              <TextInput
                title="Email"
                placeholder="Digite seu email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className={
                  formik.errors.email && formik.touched.email
                    ? "border-red-500 w-96"
                    : "w-96"
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
              <TextInput
                title="Senha"
                placeholder="Digite sua senha"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                className={
                  formik.errors.password && formik.touched.password
                    ? "border-red-500 w-96"
                    : "w-96"
                }
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-purple-900"
              >
                Esqueci minha senha
              </button>
            </div>
            <button
              type="submit"
              className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors mt-14"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="max-w-md mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              Recuperar Senha
            </h2>
            <form
              onSubmit={forgotPasswordFormik.handleSubmit}
              className="grid grid-cols-1"
            >
              <TextInput
                title="CPF"
                placeholder="Digite seu CPF"
                value={forgotPasswordFormik.values.cpf}
                onChange={forgotPasswordFormik.handleChange}
                onBlur={forgotPasswordFormik.handleBlur}
                name="cpf"
                className={
                  forgotPasswordFormik.errors.cpf &&
                  forgotPasswordFormik.touched.cpf
                    ? "border-red-500 w-96"
                    : "w-96"
                }
              />
              {forgotPasswordFormik.errors.cpf &&
                forgotPasswordFormik.touched.cpf && (
                  <p className="text-red-500 text-xs">
                    {forgotPasswordFormik.errors.cpf}
                  </p>
                )}
              <TextInput
                title="Data de Nascimento"
                placeholder="Digite sua data de nascimento"
                type="date"
                value={forgotPasswordFormik.values.birthDate}
                onChange={forgotPasswordFormik.handleChange}
                onBlur={forgotPasswordFormik.handleBlur}
                name="birthDate"
                className={
                  forgotPasswordFormik.errors.birthDate &&
                  forgotPasswordFormik.touched.birthDate
                    ? "border-red-500 w-96"
                    : "w-96"
                }
              />
              {forgotPasswordFormik.errors.birthDate &&
                forgotPasswordFormik.touched.birthDate && (
                  <p className="text-red-500 text-xs">
                    {forgotPasswordFormik.errors.birthDate}
                  </p>
                )}
              <TextInput
                title="Nova Senha"
                placeholder="Digite sua nova senha"
                type="password"
                value={forgotPasswordFormik.values.newPassword}
                onChange={forgotPasswordFormik.handleChange}
                onBlur={forgotPasswordFormik.handleBlur}
                name="newPassword"
                className={
                  forgotPasswordFormik.errors.newPassword &&
                  forgotPasswordFormik.touched.newPassword
                    ? "border-red-500 w-96"
                    : "w-96"
                }
              />
              {forgotPasswordFormik.errors.newPassword &&
                forgotPasswordFormik.touched.newPassword && (
                  <p className="text-red-500 text-xs">
                    {forgotPasswordFormik.errors.newPassword}
                  </p>
                )}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors mt-6"
              >
                Atualizar Senha
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-purple-800 rounded-lg w-full mt-4 text-purple-800 bg-white py-2 px-4 hover:bg-purple-50 transition-colors"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
