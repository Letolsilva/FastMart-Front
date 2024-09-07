import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { fetchProducts } from "../../../services/ServicesProduct";
import { Header } from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";

export interface TypeProduct {
  id: number;
  name: string;
  unit_of_measure: string;
  purchase_price: string;
  sale_price: string;
  supplier: string;
  code: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  const handleProductClick = (id: number) => {
    navigate(`/dados-products/${id}`);
  };

  return (
    <div className="p-4">
      <Header showIcon={true} backRoute="/main" />
      <div className="border border-gray-300 p-10 rounded-lg shadow-md mt-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-800">
            Produtos Cadastrados
          </h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Pesquisar Produto"
          />
        </div>
        {filteredProducts.length > 0 ? (
          <ul className="space-y-2">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <span>{product.name}</span>
                <div className="flex space-x-5">
                  <button className="text-neutral-500 hover:text-purple-800">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-neutral-500 hover:text-purple-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
