import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { PostLogin } from "../../services/APIservices";
import { useNavigate } from 'react-router-dom';

const LoginSchema = yup.object().shape({
    email: yup.string().required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
});

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await PostLogin(values, navigate);
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
                    : " w-96"
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs ">
                  {formik.errors.email}
                </p>
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
                <p className="text-red-500 text-xs ">
                  {formik.errors.password}
                </p>
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