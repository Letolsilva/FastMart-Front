import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../../components/TextInput";
import { DateInput } from "../../../components/DateInput";
import { NumberInput } from "../../../components/NumberInput";
import { SelectInput } from "../../../components/SelectInput";
import { Header } from "../../../components/Header";
import { registerProduct } from "../../../services/ServicesProduct";
import NumericInput from "../../../components/NumericInput";

export const ValidationProdcutSchema = yup.object().shape({
  product: yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    unit_of_measure: yup.string().required("Unidade de Medida é obrigatória"),
    purchase_price: yup
      .number()
      .typeError("Preço de compra deve ser um número")
      .required("Preço de compra é obrigatório"),
    sale_price: yup
      .number()
      .typeError("Preço de venda deve ser um número")
      .required("Preço de venda é obrigatório"),
    supplier: yup.string().required("Fornecedor é obrigatório"),
    code: yup.string().required("Código é obrigatório"),
  }),
  expiry_date: yup.date().required("Data de validade é obrigatória"),
});

export const RegisterProduct: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      date: "",
      value: 1.0,
      quantity: "",
      expiry_date: "",
      payment_method: "",
      product: {
        name: "",
        unit_of_measure: "",
        purchase_price: "",
        sale_price: "",
        supplier: "",
        code: "",
      },
    },
    validationSchema: ValidationProdcutSchema,
    onSubmit: async (values) => {
      const date = new Date(values.expiry_date);
      const formattedDate = date.toISOString().split("T")[0];
      
      values.expiry_date = formattedDate;

      values.product.sale_price = values.product.sale_price.replace(/,/g, ".");
      values.product.purchase_price = values.product.purchase_price.replace(
        /,/g,
        "."
      );

      await registerProduct(values);
    },
  });
  return (
    <div>
      <Header showIcon={true} backRoute="/main" />
      <div className="inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="mt-5 max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Cadastrar Produto
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <TextInput
                title="Nome*"
                placeholder="Digite seu nome"
                value={formik.values.product.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="product.name"
                className={
                  formik.errors.product?.name && formik.touched.product?.name
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.product?.name && formik.touched.product?.name && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.product?.name}
                </p>
              )}

              <DateInput
                title="Data da compra*"
                placeholder="Digite a data da compra"
                value={formik.values.date}
                onChange={formik.handleChange}
                name="date"
                className={
                  formik.errors.date && formik.touched.date
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.date && formik.touched.date && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.date}
                </p>
              )}

              <SelectInput
                title="Unidade de Medida*"
                value={formik.values.product.unit_of_measure}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Selecionar a unidade"
                name="product.unit_of_measure"
                className={
                  formik.errors.payment_method && formik.touched.payment_method
                    ? "border-red-500"
                    : ""
                }
                options={["kg", "g", "l", "ml", "nenhum(a)"]}
              />
              {formik.errors.payment_method &&
                formik.touched.payment_method && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.payment_method}
                  </p>
                )}

              <NumericInput
                title="Preço de Compra*"
                placeholder="Digite o preço de compra"
                value={formik.values.product.purchase_price}
                name="product.purchase_price"
                onValueChange={(value) =>
                  formik.setFieldValue("product.purchase_price", value)
                }
                className={
                  formik.errors.product?.purchase_price &&
                  formik.touched.product?.purchase_price
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.product?.purchase_price &&
                formik.touched.product?.purchase_price && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.product.purchase_price}
                  </p>
                )}

              <NumberInput
                title="Quantidade por unidade*"
                placeholder="Digite a quantidade por unidade"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="quantity"
                className={
                  formik.errors.quantity && formik.touched.quantity
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.quantity && formik.touched.quantity && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.quantity}
                </p>
              )}
            </div>

            <div>
              <NumericInput
                title="Preço de Venda*"
                placeholder="Digite o preço de venda"
                value={formik.values.product.sale_price}
                name="product.sale_price"
                onValueChange={(value) =>
                  formik.setFieldValue("product.sale_price", value)
                }
                className={
                  formik.errors.product?.sale_price &&
                  formik.touched.product?.sale_price
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.product?.sale_price &&
                formik.touched.product?.sale_price && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.product.sale_price}
                  </p>
                )}

              <DateInput
                title="Data de validade*"
                placeholder="Digite a data de validade"
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

              <TextInput
                title="Fornecedor*"
                placeholder="Digite o fornecedor"
                value={formik.values.product.supplier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="product.supplier"
                className={
                  formik.errors.product?.supplier &&
                  formik.touched.product?.supplier
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.product?.supplier &&
                formik.touched.product?.supplier && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.product.supplier}
                  </p>
                )}

              <NumberInput
                title="Código do Produto*"
                placeholder="Digite o código do produto"
                value={formik.values.product.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="product.code"
                className={
                  formik.errors.product?.code && formik.touched.product?.code
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.product?.code && formik.touched.product?.code && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.product.code}
                </p>
              )}

              <SelectInput
                title="Metodo de Pagamento*"
                value={formik.values.payment_method}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Selecionar o método de pagamento"
                name="payment_method"
                className={
                  formik.errors.product?.unit_of_measure &&
                  formik.touched.product?.unit_of_measure
                    ? "border-red-500"
                    : ""
                }
                options={[
                  "Dinheiro",
                  "Pix",
                  "Cartão de credito",
                  "Cartão de débito",
                ]}
              />
              {formik.errors.product?.unit_of_measure &&
                formik.touched.product?.unit_of_measure && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.product.unit_of_measure}
                  </p>
                )}
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
    </div>
  );
};
