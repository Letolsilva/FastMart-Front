{
  /*Mensagem de acesso negado para usuarios sem autorização da pagina */
}
import { Header } from "../../components/Header";

const NegatedAcess: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h3 className="text-3xl font-bold text-red-600 mb-4">
          Acesso Negado!!
        </h3>
        <p className="text-lg text-gray-700">
          Por favor, faça login com uma conta que tenha autorização para acessar
          esta página.
        </p>
      </div>
    </div>
  );
};

export default NegatedAcess;
