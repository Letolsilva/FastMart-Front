import { Header } from "../../components/Header";

const NegatedAcess: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
      {/* Cabeçalho */}
      <Header />
      {/* Conteúdo Principal */}
      <h3> Acesso Negado !! </h3>
      
    </div>
  );
};

export default NegatedAcess;
