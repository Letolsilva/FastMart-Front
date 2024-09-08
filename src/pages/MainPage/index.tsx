import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import MenuMain from "../../components/MenuMain";

export const getProfession = (storedCode: number | null) => {
  if (storedCode === 0) return "Administrador";
  if (storedCode === 1) return "Caixa";
  if (storedCode === 2) return "Estoquista";
  if (storedCode === 3) return "RH";
  if (storedCode === 4) return "Marketing";

  return "Desconhecido";
};

const MainPage: React.FC = () => {
  const [code, setCode] = useState<number | null>(null);
  const [profession, setProfession] = useState<string>("");

  useEffect(() => {
    const storedCode = Number(localStorage.getItem("code"));
    setCode(storedCode);
    const userProfession = getProfession(storedCode);
    setProfession(userProfession);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-12">

        {profession === "Caixa" ? (
          <div className="flex justify-center w-full max-w-md">
            <MenuMain nome={"Registrar venda"} local="./sales" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-5xl">
            {/* Cadastrar Funcionário - Apenas Administrador ou RH */}
            <MenuMain
              nome={"Cadastrar Funcionário"}
              local="./register"
              className={
                profession !== "Administrador" && profession !== "RH"
                  ? "hidden"
                  : ""
              }
            />

            {/* Listar Funcionários - Apenas Administrador ou RH */}
            <MenuMain
              nome={"Listar Funcionários"}
              local="./lista-funcionarios"
              className={
                profession !== "Administrador" && profession !== "RH"
                  ? "hidden"
                  : ""
              }
            />

            {/* Cadastrar Produto - Estoquista e Administrador */}
            <MenuMain
              nome={"Cadastrar Produto"}
              local="./registrar-produto"
              className={
                profession !== "Estoquista" && profession !== "Administrador"
                  ? "hidden"
                  : ""
              }
            />

            {/* Listar Produtos - Estoquista e Administrador */}
            <MenuMain
              nome={"Listar Produtos"}
              local="/lista-produtos"
              className={
                profession !== "Estoquista" && profession !== "Administrador"
                  ? "hidden"
                  : ""
              }
            />

            {/* Registrar venda - Caixa e Administrador */}
            <MenuMain
              nome={"Registrar venda"}
              local="./sales"
              className={
                profession !== "Caixa" && profession !== "Administrador"
                  ? "hidden"
                  : ""
              }
            />

            {/* Cancelar venda - Apenas Administrador */}
            <MenuMain
              nome={"Cancelar venda"}
              local="./cancel-sale"
              className={profession !== "Administrador" ? "hidden" : ""}
            />

            {/* Análise de Dados - Apenas Administrador ou Marketing */}
            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <MenuMain
                nome={"Análise de Dados"}
                local="/"
                className={
                  profession !== "Marketing" && profession !== "Administrador"
                    ? "hidden"
                    : ""
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
