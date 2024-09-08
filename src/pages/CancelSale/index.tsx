import React, { useEffect, useState } from "react";
import { deleteSale, fetchFinances, fetchProducts } from "../../services/ServicesProduct";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import SearchBar from "../../components/SearchBar";

export const CancelSale: React.FC = () => {
  const [finances, setFinance] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [company_id, setCompanyId] = useState<number | null>(null);

  useEffect(() => {
    const loadCompanyId = async () => {
      try {
        const company_id = Number(localStorage.getItem("company_id"));
        setCompanyId(company_id);
      } catch (error) {
        setError("Erro ao buscar ID da empresa");
      }
    };

    loadCompanyId();
  }, []);

  useEffect(() => {
    if (company_id === null) return;

    const loadFinances = async () => {
      try {
        const data = await fetchFinances();
        setFinance(data);
      } catch (error) {
        setError("Erro ao buscar dados da API");
      } finally {
        setLoading(false);
      }
    };

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

    loadFinances();
    loadProducts();
  }, [company_id]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFinances = finances
    .map((finance) => {
      const product = products.find((product) => product.id === finance.product_id);
      return {
        ...finance,
        productName: product ? product.name : "Produto não encontrado",
      };
    })
    .filter((finance) => {
      const idString = String(finance.id); // Convert id to a string
      return idString.includes(searchTerm || '');
    });

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async (id: any) => {
    await deleteSale(id, navigate);
  };

  return (
    <div className="p-4">
      <Header showIcon={true} backRoute="/main" />
      <div className="border border-gray-300 p-10 rounded-lg shadow-md mt-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-800">
            Vendas Cadastradas
          </h1>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Pesquisar venda pelo ID"
          />
        </div>
        <ul className="space-y-2">
          {filteredFinances.length > 0 ? (
            filteredFinances.map((finance) => (
              finance.description === "Venda" ? (
                <li key={finance.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <p>ID Venda: {finance.id}</p>
                    <p>Produto: {finance.productName}</p>
                    <p>Valor: R${finance.value}</p>
                  </div>
                  <div className="flex space-x-5">
                    <button
                      className="text-neutral-500 hover:text-purple-800"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Você quer mesmo deletar ${finance.id}?`
                        );
                        if (confirmed) {
                          handleDelete(finance.id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              ) : null
            ))
          ) : (
            <p className="text-center text-purple-800">
              Venda não encontrada
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};
