import { Header } from "../../../components/Header";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { TextInput } from "../../../components/TextInput";
import { NumberInput } from "../../../components/NumberInput";
import { updateProductData } from "../../../services/ServicesProduct";
import { DateInput } from "../../../components/DateInput";
import { SelectInput } from "../../../components/SelectInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NumericInput from "../../../components/NumericInput";
import { useFormik } from "formik";
import { fetchJustOneProduct } from "../../../services/ServicesProduct";

export const ValidationEditProdcutSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  quantity_per_unit: yup.number().required("Quantidade é obrigatório"),
  unit_of_measure: yup.string().required("Unidade de Medida é obrigatória"),
  purchase_price: yup
    .number()
    .typeError("Preço de compra deve ser um número")
    .required("Preço de compra é obrigatório"),
  sale_price: yup
    .number()
    .typeError("Preço de venda deve ser um número")
    .required("Preço de venda é obrigatório"),
    expiry_date: yup.date().required("Data de validade é obrigatória"),
    supplier: yup.string().required("Fornecedor é obrigatório"),
});

export interface TypeProduct_lucas {
  date: string;
  value: number;
  quantity_per_unit: number;
  expiry_date: string;
  payment_method: string;
  name: string;
  unit_of_measure: string;
  purchase_price: number;
  sale_price: number;
  supplier: string;
  id: number;
  code: number;
  createdAt: string;
  updatedAt: string;
}

export const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : NaN;
  const [product, setProduct] = useState<TypeProduct_lucas >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      value: 0,
      quantity_per_unit: 0,
      unit_of_measure: "",
      purchase_price: 0,
      sale_price: 0,
      expiry_date: "",
      supplier: "",
      payment_method: "", 
      date: "", 
      id: 0, 
      code: 0, 
      createdAt: "", 
      updatedAt: "",
    },
    validationSchema: ValidationEditProdcutSchema,
    onSubmit: async (values: TypeProduct_lucas) => {
      try{
        await updateProductData(values);
        toast.success("Dados atualizados com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar os dados.");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await fetchJustOneProduct(productId);
        if (fetchedProduct) {
          // Formatando a data de vencimento no formato YYYY-MM-DD
          const formattedExpiryDate = fetchedProduct.expiry_date
            ? new Date(fetchedProduct.expiry_date).toISOString().split("T")[0]
            : "";

          setProduct(fetchedProduct);

          formik.setValues({
            name: fetchedProduct.name,
            value: fetchedProduct.value,
            quantity_per_unit: fetchedProduct.quantity_per_unit,
            unit_of_measure: fetchedProduct.unit_of_measure,
            purchase_price: fetchedProduct.purchase_price,
            sale_price: fetchedProduct.sale_price,
            expiry_date: formattedExpiryDate,
            supplier: fetchedProduct.supplier,
            payment_method: fetchedProduct.payment_method, 
            date: fetchedProduct.date, 
            id: fetchedProduct.id, 
            code: fetchedProduct.code, 
            createdAt: fetchedProduct.createdAt, 
            updatedAt: fetchedProduct.updatedAt,

          });
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar os dados do Produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

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
      <Header showIcon={true} backRoute="/lista-produtos" />
      <div className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              Editar Produto
            </h2>
            {product ? (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                <div className="flex flex-col">
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
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <NumberInput
                      title="Quantidade"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.quantity_per_unit}
                      name="quantity_per_unit"
                      className={
                        formik.errors.quantity_per_unit &&
                        formik.touched.quantity_per_unit
                          ? "border-red-500 text-gray-700"
                          : "text-gray-700"
                      }
                    />
                    {formik.errors.quantity_per_unit && formik.touched.quantity_per_unit && (
                      <p className="text-red-500 text-xs">{formik.errors.quantity_per_unit}</p>
                    )}
                  </div>
  
                  <div className="flex flex-col">
                    <SelectInput
                      title="Unidade de Medida*"
                      value={formik.values.unit_of_measure}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Selecionar a unidade"
                      name="unit_of_measure"
                      className={
                        formik.errors.unit_of_measure &&
                        formik.touched.unit_of_measure
                          ? "border-red-500"
                          : ""
                      }
                      options={["kg", "g", "l", "ml", "nenhum(a)"]}
                    />
                    {formik.errors.unit_of_measure && formik.touched.unit_of_measure && (
                      <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.unit_of_measure}
                      </p>
                    )}
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <NumericInput
                      title="Preço de Compra*"
                      placeholder="Digite o preço de compra"
                      value={formik.values.purchase_price}
                      name="purchase_price"
                      onValueChange={(value) =>
                        formik.setFieldValue("purchase_price", parseFloat(value))
                      }
                      className={
                        formik.errors.purchase_price &&
                        formik.touched.purchase_price
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {formik.errors.purchase_price && formik.touched.purchase_price && (
                      <p className="text-red-500 text-xs">
                        {formik.errors.purchase_price}
                      </p>
                    )}
                  </div>
  
                  <div className="flex flex-col">
                    <NumericInput
                      title="Preço de Venda*"
                      placeholder="Digite o preço de venda"
                      value={formik.values.sale_price}
                      name="sale_price"
                      onValueChange={(value) =>
                        formik.setFieldValue("sale_price", parseFloat(value))
                      }
                      className={
                        formik.errors.sale_price && formik.touched.sale_price
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {formik.errors.sale_price && formik.touched.sale_price && (
                      <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.sale_price}
                      </p>
                    )}
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <TextInput
                      title="Fornecedor*"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.supplier}
                      name="supplier"
                      className={
                        formik.errors.supplier && formik.touched.supplier
                          ? "border-red-500 text-gray-700"
                          : "text-gray-700"
                      }
                    />
                    {formik.errors.supplier && formik.touched.supplier && (
                      <p className="text-red-500 text-xs">{formik.errors.supplier}</p>
                    )}
                  </div>
  
                  <div className="flex flex-col">
                    <DateInput
                      title="Data de Vencimento*"
                      value={formik.values.expiry_date}
                      onChange={formik.handleChange}
                      name="expiry_date"
                      className={
                        formik.errors.expiry_date && formik.touched.expiry_date
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {formik.errors.expiry_date && formik.touched.expiry_date && (
                      <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.expiry_date}
                      </p>
                    )}
                  </div>
                </div>
  
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
                  >
                    Atualizar
                  </button>
                </div>
              </form>
            ) : (
              <p>Produto não encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

export default EditProduct;
