import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { Header } from "../../../components/Header";
import { TextInput } from "../../../components/TextInput";
import {
  fetchCompany,
  updateCompanyData,
} from "../../../services/ServiceCompany";

const ValidationCompanySchema = yup.object().shape({
  company: yup.object().shape({
    comp_name: yup.string().required("Nome da empresa é obrigatório"),
    comp_cnpj: yup
      .string()
      .matches(
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        "CNPJ deve estar no formato xx.xxx.xxx/xxxx-xx"
      )
      .required("CNPJ é obrigatório"),
    comp_employees: yup
      .number()
      .typeError("Número de funcionários deve ser um número")
      .required("Número de funcionários é obrigatório"),
  }),
  address: yup.object().shape({
    street: yup.string().required("Rua é obrigatória"),
    number: yup
      .number()
      .typeError("Número deve ser um número")
      .required("Número é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    createdAt: yup.date().required("Data de criação é obrigatória"),
    updatedAt: yup.date().required("Data de atualização é obrigatória"),
  }),
});

const EditCompanyPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      company: {
        id: -1,
        comp_name: "",
        comp_cnpj: "",
        comp_employees: 0,
        createdAt: "",
        updatedAt: "",
      },
      companyAddress: {
        id: -1,
        street: "",
        number: -1,
        district: "",
        city: "",
        state: "",
        createdAt: "",
        updatedAt: "",
        company_id: 1,
      },
    },
    validationSchema: ValidationCompanySchema,

    onSubmit: async (values) => {
      try {
        console.log("aaaa");
        await updateCompanyData(values);
        toast.success("Empresa atualizada com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar a empresa.");
      }
    },
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetchCompany();

        if (response.status === 1) {
          const fetchedCompany = response.company;
          const fetchedCompanyAddress = response.companyAddress;

          formik.setValues({
            company: {
              id: fetchedCompany.id,
              comp_name: fetchedCompany.comp_name,
              comp_cnpj: fetchedCompany.comp_cnpj,
              comp_employees: fetchedCompany.comp_employees,
              createdAt: fetchedCompany.createdAt,
              updatedAt: fetchedCompany.updatedAt,
            },
            companyAddress: {
              id: fetchedCompanyAddress.id,
              street: fetchedCompanyAddress.street,
              number: fetchedCompanyAddress.number,
              district: fetchedCompanyAddress.district,
              city: fetchedCompanyAddress.city,
              state: fetchedCompanyAddress.state,
              createdAt: fetchedCompanyAddress.createdAt,
              updatedAt: fetchedCompanyAddress.updatedAt,
              company_id: fetchedCompanyAddress.company_id,
            },
          });
        } else {
          setError("Dados da empresa não encontrados.");
        }
      } catch (error) {
        setError("Erro ao carregar os dados da empresa.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

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
      <Header showIcon={true} backRoute="/main" />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Editar Empresa
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <TextInput
              title="Nome da Empresa*"
              onChange={formik.handleChange}
              value={formik.values.company.comp_name}
              name="company.comp_name"
              className={
                formik.errors.company?.comp_name &&
                formik.touched.company?.comp_name
                  ? "border-red-500"
                  : "text-gray-700"
              }
            />
            {formik.errors.company?.comp_name &&
              formik.touched.company?.comp_name && (
                <p className="text-red-500 text-xs">
                  {formik.errors.company?.comp_name}
                </p>
              )}

            <TextInput
              title="CNPJ*"
              onChange={formik.handleChange}
              value={formik.values.company.comp_cnpj}
              name="company.comp_cnpj"
              className={
                formik.errors.company?.comp_cnpj &&
                formik.touched.company?.comp_cnpj
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.errors.company?.comp_cnpj &&
              formik.touched.company?.comp_cnpj && (
                <p className="text-red-500 text-xs">
                  {formik.errors.company?.comp_cnpj}
                </p>
              )}

            <TextInput
              title="Número de Funcionários*"
              onChange={formik.handleChange}
              value={formik.values.company.comp_employees}
              name="company.comp_employees"
              className={
                formik.errors.company?.comp_employees &&
                formik.touched.company?.comp_employees
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.errors.company?.comp_employees &&
              formik.touched.company?.comp_employees && (
                <p className="text-red-500 text-xs">
                  {formik.errors.company?.comp_employees}
                </p>
              )}

            <button
              type="submit"
              className="col-span-2 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
            >
              Atualizar Empresa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPage;
