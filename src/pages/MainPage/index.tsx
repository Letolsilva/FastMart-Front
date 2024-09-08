import { Header } from "../../components/Header";
import MenuMain from "../../components/MenuMain";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
      {/* Cabeçalho */}
      <Header />
      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center p-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-5xl">
          <MenuMain
            nome={"Cadastrar Funcionário"}
            local="./register"
          ></MenuMain>
          <MenuMain
            nome={"Listar Funcionários"}
            local="./lista-funcionarios"
          ></MenuMain>
          <MenuMain
            nome={"Cadastrar Produto"}
            local="./registrar-produto"
          ></MenuMain>
          <MenuMain
            nome={"Listar Produtos"}
            local="/product/list"
          ></MenuMain>
          <MenuMain nome={"Registrar venda"} local="./sales"></MenuMain>
          <MenuMain nome={"Cancelar venda"} local="./cancel-sale"></MenuMain>
          <MenuMain nome={"Análise de Dados"} local="/"></MenuMain>
        </ul>
      </main>
    </div>
  );
};

export default MainPage;