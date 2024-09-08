import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeProduct } from "../ListProducts";
import { fetchProducts } from "../../../services/ServicesProduct";
import { Header } from "../../../components/Header";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [product, setProduct] = useState<TypeProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError("Erro ao buscar dados da API");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((prod) => prod.id === parseInt(id!));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header showIcon={true} backRoute="/lista-produtos" />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">
            Detalhes do Produto
          </h1>
          {product ? (
            <div className="space-y-6">
              <p className="text-gray-800">
                <strong>Nome: </strong> {product.name}
              </p>
              <p className="text-gray-700">
                <strong>Unidade de Medida: </strong> {product.unit_of_measure}
              </p>
              <p className="text-gray-700">
                <strong>Preço de Compra: </strong> R$ {product.purchase_price}
              </p>
              <p className="text-gray-700">
                <strong>Quantidade por Unidade:</strong>
                {product.quantity_per_unit}
              </p>
              <p className="text-gray-700">
                <strong>Preço de Venda: </strong> R$ {product.sale_price}
              </p>
              <p className="text-gray-700">
                <strong>Data de Validade: </strong>{" "}
                {new Date(product.expiry_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Fornecedor: </strong> {product.supplier}
              </p>
              <p className="text-gray-700">
                <strong>Código: </strong> {product.code}
              </p>
            </div>
          ) : (
            <p>Produto não encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
