import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NumberInput } from "../../components/NumberInput";
import { SelectInput } from "../../components/SelectInput";
import { Header } from "../../components/Header";
import { fetchProducts} from "../../services/ServicesProduct";
import { TypeProduct } from "../Products/ListProducts";
import { recordSale } from "../../services/ServicesProduct";
import { useNavigate } from "react-router-dom";

export const ValidationProdcutSchema = yup.object().shape({
  cash_register: yup.number().required("Número do caixa é obrigatório"),
  payment_method: yup.string().required("Forma de pagamento é obrigatória"),
});

export const Sales: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<TypeProduct[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<
        { product: TypeProduct; quantity: number;}[]
    >([]);

    useEffect(() => {
        const loadProducts = async () => {
        try {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);  // Armazena os produtos no estado
        } catch (error) {
            setError("Erro ao buscar dados da API");
        }
        };

        loadProducts();
    }, []);
    
    const handleProductSelect = (productName: string) => {        
        const product = products.find((p) => p.name === productName);
        if (product && !selectedProducts.some((p) => p.product.name === productName)) {
          setSelectedProducts([...selectedProducts, { product, quantity: 1}]);
        }
      };
    
    const handleQuantityChange = (index: number, quantity: number) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].quantity = quantity;
        setSelectedProducts(updatedProducts);
    };
    //console.log(selectedProducts);
    
    const formik = useFormik({
        initialValues: {
            s: "",
            q: 1,
            cash_register: -1,
            payment_method: "",
            products: []
        },
        
        validationSchema: ValidationProdcutSchema,
        onSubmit: async (values) => {
            
            const productsToSend = selectedProducts.map(item => ({
                code: item.product.code,
                quantity: item.quantity,
                name: item.product.name,
              }));
        
              // Set the products field in formik values
              const dataToSend = {
                ...values,
                products: productsToSend,
              };
              console.log(dataToSend);
              await recordSale(dataToSend, navigate);
        },
  });

  return (
    <div>
      <Header showIcon={true} backRoute="/main" />
      <div className="inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="mt-5 max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Registrar Venda
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-3 gap-8"
          >
            <div>

              <NumberInput
                title="Número do caixa*"
                placeholder="Digite o número do caixa"
                value={formik.values.cash_register}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="cash_register"
                className={
                  formik.errors.cash_register && formik.touched.cash_register
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.cash_register && formik.touched.cash_register && (
                <p className="text-red-500 text-xs -mt-3 mb-3">
                  {formik.errors.cash_register}
                </p>
              )}
            </div>

            <div>
              
              <SelectInput
                title="Método de Pagamento*"
                value={formik.values.payment_method}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Selecionar o método de pagamento"
                name="payment_method"
                className={
                  formik.errors.payment_method &&
                  formik.touched.payment_method
                    ? "border-red-500"
                    : ""
                }
                options={[
                  "Dinheiro",
                  "Pix",
                  "Cartão de crédito",
                  "Cartão de débito",
                ]}
              />
              {formik.errors.payment_method &&
                formik.touched.payment_method && (
                  <p className="text-red-500 text-xs -mt-3 mb-3">
                    {formik.errors.payment_method}
                  </p>
                )}
            </div>
            <SelectInput
            title="Selecionar produtos"
            onChange={(e) => handleProductSelect(e.target.value)}
            onBlur={formik.handleBlur}
            value = {formik.values.s}
            placeholder=" "
            name="products"
            className="col-span-2"
            options={products.map((product) => product.name)}
            >

            </SelectInput>

            <div className="col-span-3">
              <h3 className="font-bold mb-2">Produtos Selecionados</h3>
              {selectedProducts.length === 0 ? (
                <p>Nenhum produto selecionado</p>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {selectedProducts.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="mr-4">{item.product.name}</span>
                      <input
                      placeholder="Quantidade"
                        title="Quantidade"
                        type="number"
                        value={item.quantity}
                        className="w-1/5 border border-gray-300 rounded px-2 text-center py-1"
                        onChange={(e) =>
                            handleQuantityChange(index, Number(e.target.value)) // Update state with new value
                        }
                        name={`quantity-${index}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>


            <button
              type="submit"
              className="col-span-3 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
            >
              Vender
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
