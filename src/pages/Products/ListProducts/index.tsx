import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
  getExpiringProducts,
} from "../../../services/ServicesProduct";
import { Header } from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";


export interface TypeProduct {
  id: number;
  name: string;
  unit_of_measure: string;
  purchase_price: string;
  sale_price: string;
  supplier: string;
  code: string;
  quantity_per_unit: number;
  expiry_date: string;
}

export interface TypeExpiringProduct {
  name: string;
  expiry_date: string;
  days_until_expiry: number;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [expiringProducts, setExpiringProducts] = useState<
    (TypeExpiringProduct & { isExpired: boolean })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDaysUntilExpiry, setModalDaysUntilExpiry] = useState<number>(0);
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

  const handleModalDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModalDaysUntilExpiry(Number(event.target.value));
  };

  const handleSearchExpiringProducts = async () => {
    if (modalDaysUntilExpiry === 0) {
      setExpiryError("Digite um número valido)");
      return;
    }

    if (modalDaysUntilExpiry < 0) {
      setExpiryError("Número de dias deve ser um valor positivo.");
      return;
    }
    try {
      const data = await getExpiringProducts(modalDaysUntilExpiry);

      if (data && (data.products || data.expiredProducts)) {
        const processedProducts = [
          ...(data.products || []).map((product: TypeExpiringProduct) => {
            const expiryDate = new Date(product.expiry_date);
            const isExpired = expiryDate < new Date();
            return { ...product, isExpired };
          }),
          ...(data.expiredProducts || []).map(
            (product: TypeExpiringProduct) => ({
              ...product,
              isExpired: true,
            })
          ),
        ];

        setExpiringProducts(processedProducts);
      } else {
        setExpiringProducts([]);
      }
      setExpiryError(null);
    } catch (error) {
      setExpiryError("Erro ao buscar produtos que vão vencer");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalDaysUntilExpiry(0);
    setExpiringProducts([]);
  };

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


  const handleDelete = async (code: string) => {
    await deleteProduct(code, navigate);
  };

  return (
    <div className="p-4">
      <Header showIcon={true} backRoute="/main" />
      <div className="border border-gray-300 p-10 rounded-lg shadow-md mt-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-800 flex-shrink-0 w-[65rem]">
            Produtos Cadastrados
          </h1>

          <div className="flex space-x-4 flex-grow">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Pesquisar Produto"
            />

            <button
              onClick={openModal}
              className="border border-purple-900 text-purple-900 hover:text-purple-700 hover:border-purple-700 transition-colors rounded-md w-56 text-center h-10 flex items-center justify-center"
            >
              Consultar Validade
            </button>
          </div>
        </div>

        {expiryError && <p className="text-red-500">{expiryError}</p>}

        {/* List of filtered products */}
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
                  <button
                    className="text-neutral-500 hover:text-purple-800"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Você quer mesmo deletar ${product.name}?`
                      );
                      if (confirmed) {
                        handleDelete(product.code);
                      }
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado</p>
        )}

        {/* Modal for expiring products */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
              <h2 className="text-xl font-bold text-purple-800 mb-4">
                Produtos Próximos ao Vencimento
              </h2>
              <input
                type="number"
                value={modalDaysUntilExpiry}
                onChange={handleModalDaysChange}
                placeholder="Dias até o vencimento"
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
              />
              <button
                onClick={handleSearchExpiringProducts}
                className="border border-purple-900 text-purple-900 hover:text-purple-700 hover:border-purple-700 transition-colors mb-4 w-full py-2 px-4 rounded-md"
              >
                Consultar
              </button>
              {expiryError && (
                <p className="text-red-500 mb-4">{expiryError}</p>
              )}
              <ul className="space-y-2 mb-4">
                {expiringProducts.map((product, index) => {
                  const formattedDate = format(
                    parseISO(product.expiry_date),
                    "dd/MM/yyyy"
                  );
                  return (
                    <li
                      key={index}
                      className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg ${
                        product.isExpired ? "bg-red-100" : ""
                      }`}
                    >
                      <span
                        className={`${
                          product.isExpired ? "text-red-600 font-bold" : ""
                        }`}
                      >
                        {product.name} {product.isExpired && "(Vencido)"}
                      </span>
                      <div className="flex space-x-5">
                        <span>{formattedDate}</span>
                        <span>
                          {product.days_until_expiry}{" "}
                          {product.isExpired ? "dias atrás" : "dias restantes"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
