{/* Edição de empresa - Como o cliente já receberá o software com a empresa cadastrada, ele poderá apenas alterar os dados existentes */}

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

//valida os dados
const ValidationCompanySchema = yup.object().shape({
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

  address: yup.object().shape({
    street: yup.string().required("Rua é obrigatória"),
    number: yup
      .number()
      .typeError("Número deve ser um número")
      .required("Número é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
  }),
});

const EditCompanyPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      comp_name: "",
      comp_cnpj: "",
      comp_employees: 0,

      address: {
        street: "",
        number: -1,
        district: "",
        city: "",
        state: "",
      },
    },
    validationSchema: ValidationCompanySchema,

    onSubmit: async (values) => {
      try {
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
          const fetchedaddress = response.address;

          formik.setValues({
            comp_name: fetchedCompany.comp_name,
            comp_cnpj: fetchedCompany.comp_cnpj,
            comp_employees: fetchedCompany.comp_employees,

            address: {
              street: fetchedaddress.street,
              number: fetchedaddress.number,
              district: fetchedaddress.district,
              city: fetchedaddress.city,
              state: fetchedaddress.state,
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
        <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Editar Empresa
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <TextInput
                title="Nome da Empresa*"
                onChange={formik.handleChange}
                value={formik.values.comp_name}
                name="comp_name"
                className={
                  formik.errors.comp_name && formik.touched.comp_name
                    ? "border-red-500"
                    : "text-gray-700"
                }
              />
              {formik.errors.comp_name && formik.touched.comp_name && (
                <p className="text-red-500 text-xs">
                  {formik.errors.comp_name}
                </p>
              )}
            </div>

            <div>
              <TextInput
                title="CNPJ*"
                onChange={formik.handleChange}
                value={formik.values.comp_cnpj}
                name="comp_cnpj"
                className={
                  formik.errors.comp_cnpj && formik.touched.comp_cnpj
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.comp_cnpj && formik.touched.comp_cnpj && (
                <p className="text-red-500 text-xs">
                  {formik.errors.comp_cnpj}
                </p>
              )}
            </div>

            <div>
              <TextInput
                title="Número de Funcionários*"
                onChange={formik.handleChange}
                value={formik.values.comp_employees}
                name="comp_employees"
                className={
                  formik.errors.comp_employees && formik.touched.comp_employees
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.comp_employees &&
                formik.touched.comp_employees && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.comp_employees}
                  </p>
                )}
            </div>

            <div>
              <TextInput
                title="Rua*"
                onChange={formik.handleChange}
                value={formik.values.address.street}
                name="address.street"
                className={
                  formik.errors.address?.street &&
                  formik.touched.address?.street
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address?.street &&
                formik.touched.address?.street && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.address?.street}
                  </p>
                )}
            </div>

            <div>
              <TextInput
                title="Número*"
                onChange={formik.handleChange}
                value={formik.values.address.number}
                name="address.number"
                className={
                  formik.errors.address?.number &&
                  formik.touched.address?.number
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address?.number &&
                formik.touched.address?.number && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.address?.number}
                  </p>
                )}
            </div>

            <div>
              <TextInput
                title="Bairro*"
                onChange={formik.handleChange}
                value={formik.values.address.district}
                name="address.district"
                className={
                  formik.errors.address?.district &&
                  formik.touched.address?.district
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address?.district &&
                formik.touched.address?.district && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.address?.district}
                  </p>
                )}
            </div>

            <div>
              <TextInput
                title="Cidade*"
                onChange={formik.handleChange}
                value={formik.values.address.city}
                name="address.city"
                className={
                  formik.errors.address?.city && formik.touched.address?.city
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address?.city && formik.touched.address?.city && (
                <p className="text-red-500 text-xs">
                  {formik.errors.address?.city}
                </p>
              )}
            </div>

            <div>
              <TextInput
                title="Estado*"
                onChange={formik.handleChange}
                value={formik.values.address.state}
                name="address.state"
                className={
                  formik.errors.address?.state && formik.touched.address?.state
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address?.state &&
                formik.touched.address?.state && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.address?.state}
                  </p>
                )}
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
              >
                Atualizar Empresa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPage;
