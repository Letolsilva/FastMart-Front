import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import { NumberInput } from "../../components/NumberInput";
import { SelectInput } from "../../components/SelectInput";
import { registerProduct } from "../../services/APIservices";
import { Header } from "../../components/Header";
import { CashInput } from "../../components/CashInput";

export const ValidationProdcutSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    unit_of_measure: yup.string().required("Unidade de Medida é obrigatório"),
    purchase_price: yup.string().required("Preço da compra é obrigatório"),
    quantity_per_unit: yup.string().required("Quantidade é obrigatório"),
    sale_price: yup.string().required("Preço é obrigatório"),
    expiry_date: yup.date().required("Data de validade é obrigatório"),
    supplier: yup.string().required("Fornecedor é obrigatório"),
    code: yup.string().required("Codigo é obrigatório"),
});

export const RegisterProduct: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            unit_of_measure: "",
            purchase_price: "",
            quantity_per_unit: "",
            sale_price: "",
            expiry_date: "",
            supplier: "",
            code: "",
        },
        validationSchema: ValidationProdcutSchema,
        onSubmit: async (values) => {
            // Formate a data para yyyy-MM-dd
            const date = new Date(values.expiry_date);
            const formattedDate = date.toISOString().split('T')[0];
            values.expiry_date = formattedDate;
            // Exiba a data formatada
            console.log("Data formatada:", values.expiry_date);
            // Enviar os dados para o serviço
            await registerProduct(values);
        },
    });
    return (
      <div>
        <Header showIcon={true} backRoute="/" />
        <div className="flex items-center justify-center bg-gray-200 bg-opacity-50">
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
                    </p>)}

                    <SelectInput
                        title="Unidade de Medida*"
                        value={formik.values.unit_of_measure}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="unit_of_measure"
                        className={
                            formik.errors.unit_of_measure && formik.touched.unit_of_measure
                            ? "border-red-500"
                            : ""
                        }
                        options={["kg", "g", "l", "ml", "nenhum(a)"]}
                    />
                    {formik.errors.unit_of_measure && formik.touched.unit_of_measure && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.unit_of_measure}
                    </p> )}

                    <CashInput // preciso olhar como estar indo agora ... a questao do sifrão melhor tirar o quanto antes...
                        title="Preço de compra*"
                        placeholder="Digite o preço da compra"
                        value={formik.values.purchase_price}
                        name="purchase_price"
                        onValueChange={(value) => formik.setFieldValue("purchase_price", value)} // Corrigido para atualizar o Formik
                        className={
                            formik.errors.purchase_price && formik.touched.purchase_price
                            ? "border-red-500"
                            : ""
                        }
                    />
                    {formik.errors.purchase_price && formik.touched.purchase_price && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.purchase_price}
                    </p>)}
                    
                    <NumberInput
                        title="Quantidade por unidade*"
                        placeholder="Digite a quantidade por unidade"
                        value={formik.values.quantity_per_unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="quantity_per_unit"
                        className={
                        formik.errors.quantity_per_unit && formik.touched.quantity_per_unit
                            ? "border-red-500"
                            : ""
                        }
                        
                    />
                    {formik.errors.quantity_per_unit && formik.touched.quantity_per_unit && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.quantity_per_unit}
                    </p>)}
                </div>

                <div>
                    <TextInput
                        title="Preço de Venda*"
                        placeholder="Digite o preço de venda"
                        value={formik.values.sale_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="sale_price"
                        className={
                        formik.errors.sale_price && formik.touched.sale_price
                            ? "border-red-500"
                            : ""
                        }
                        
                    />
                    {formik.errors.sale_price && formik.touched.sale_price && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.sale_price}
                    </p>)}

                    <DateInput
                        title="Data de validade*"
                        placeholder="Digite a data de validade"
                        value={formik.values.expiry_date} // Assegure-se de que o valor aqui é yyyy-MM-dd
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
                        value={formik.values.supplier}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="supplier"
                        className={
                        formik.errors.supplier && formik.touched.supplier
                            ? "border-red-500"
                            : ""
                        }
                        
                    />
                    {formik.errors.supplier && formik.touched.supplier && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.supplier}
                    </p>)}

                    <NumberInput
                        title="Código do Produto*"
                        placeholder="Digite o código do produto"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="code"
                        className={
                        formik.errors.code && formik.touched.code
                            ? "border-red-500"
                            : ""
                        }
                        
                    />
                    {formik.errors.code && formik.touched.code && (
                    <p className="text-red-500 text-xs -mt-3 mb-3">
                        {formik.errors.code}
                    </p>)}



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
  