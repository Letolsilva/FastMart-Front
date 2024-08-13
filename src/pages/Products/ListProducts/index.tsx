import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { fetchProducts } from "../../../services/ServicesProduct";
import { Header } from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";

export interface TypeProduct {
  id: number;
  name: string;
  unit_of_measure: string;
  purchase_price: string;
  quantity_per_unit: string;
  sale_price: string;
  expiry_date: string;
  supplier: string;
  code: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        <ul className="space-y-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {product.name}
                <div className="flex space-x-5">
                  <i className="fas fa-edit"></i>
                  <button className="text-neutral-500 hover:text-purple-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum produto encontrado</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
