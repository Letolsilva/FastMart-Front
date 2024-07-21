import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import { toast } from "react-toastify";
import { CPFInput } from "../../components/CPFInput";


const customToastStyle = {
  backgroundColor: '#f8fafc',
  color: '#020617',
  fontSize: '16px',
};

const customProgressStyle = {
  background: '#380650',
};

const SignupSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido")
    .required("CPF é obrigatório"),
});

export const SignUp: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      password: "",
      confirmPassword: "",
      dataNascimento: "",
      cpf: "",
      telefone: "",
      educacao: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      toast.success("Cadastro Concluido!",{
        style: customToastStyle,
        progressStyle: customProgressStyle
      });
      // Exibindo os valores no console para depuração
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Cadastre-se
        </h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-8">
          <div>
            <TextInput
              title="Nome*"
              placeholder="Digite seu nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="nome"
              className={
                formik.errors.nome && formik.touched.nome
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.errors.nome && formik.touched.nome && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.nome}</p>
            )}

            <TextInput
              title="Email"
              placeholder="Digite seu email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />

            <TextInput
              title="Password*"
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
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}

            <TextInput
              title="Confirme a senha"
              placeholder="Confirme sua senha"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
            />
          </div>
          <div>
            <DateInput
              title="Data de Nascimento"
              value={formik.values.dataNascimento}
              onChange={formik.handleChange}
              name="dataNascimento"
            />
            <CPFInput
              title="CPF*"
              placeholder="Digite seu CPF"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              name="cpf"
              className={
                formik.errors.cpf && formik.touched.cpf ? "border-red-500" : ""
              }
            />

            {formik.errors.cpf && formik.touched.cpf && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.cpf}</p>
            )}

            <TextInput
              title="Telefone"
              placeholder="Digite seu telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="telefone"
            />

            <TextInput
              title="Educação"
              placeholder="Digite seu nível de educação"
              value={formik.values.educacao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="educacao"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
