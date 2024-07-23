import { Header } from "../../components/Header";
import MenuMain from "../../components/MenuMain";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
      {/* Cabeçalho */}
      <Header />
      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center p-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
          <MenuMain nome={"Cadastrar empresa"} local="./register"></MenuMain>
          <MenuMain nome={"Remover Empresa"} local="/"></MenuMain>
          <MenuMain nome={"Atualizar Empresa"} local="/"></MenuMain>
          <MenuMain nome={"Cadastrar Produto"} local="/"></MenuMain>
          <MenuMain nome={"Armazenamento do Produto"} local="/"></MenuMain>
          <MenuMain nome={"Atualizar Produto"} local="/"></MenuMain>
          <MenuMain nome={"Remover Produto"} local="/"></MenuMain>
          <MenuMain nome={"Registro Financeiro"} local="/"></MenuMain>
          <MenuMain nome={"Análise de Dados"} local="/"></MenuMain>
        </ul>
      </main>
    </div>
  );
};

export default MainPage;
