import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { toast } from "react-toastify";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3334";

const LoginSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const Login: React.FC = () => {
  const signIn = useSignIn(); // Hooks should be called at the top level
  const navigate = useNavigate(); // Hooks should be called at the top level

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

  return (
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
  );
};
