import React, { useState } from "react";

const MainPage: React.FC = () => {
    const [opcao, setOpcao] = useState({ status: true, choice: 0 });
    const dicionarioOpcao: { [key: number]: string } = {1: "Cadastrar Empresa", 2:"Remover Empresa", 3:"Atualizar Empresa", 4:" Cadastrar Produto",
        5: "Armazenamento do Produto", 6:"Atualizar Produto", 7:" Remover Produto", 8:"Registro Financeiro", 9:"Análise de Dados"}

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 bg-opacity-50">
            {/* Cabeçalho */}
            <header className="bg-white border-b border-gray-300 shadow-lg p-4 flex items-center">
                <img src="public/purple-icon.png" className="w-12 h-10" alt="Purple Icon" />
                <strong className="text-2xl font-bold ml-5 text-secondary">FastMart</strong>
                <button className="ml-auto text-right text-white border border-secondary-300 rounded-full p-4 w-20 h-12 flex justify-center items-center bg-secondary hover:bg-primary">
                    Sair
                </button>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex p-12 items-center justify-center mt-11">
                {opcao.status ? (
                    <div className="p-8 bg-white border border-gray-300 rounded-lg shadow-lg ">
                        <nav className="flex flex-col items-center justify-center">
                            <ul className="grid grid-cols-3 gap-4 w-full">
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 1 })}>
                                        Cadastrar Empresa
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 2 })}>
                                        Remover Empresa
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 3 })}>
                                        Atualizar Empresa
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 4 })}>
                                        Cadastrar Produto
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 5 })}>
                                        Armazenamento do Produto
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 6 })}>
                                        Atualizar Produto
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 7 })}>
                                        Remover Produto
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 8 })}>
                                        Registro Financeiro
                                    </a>
                                </li>
                                <li className="p-3 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-colors">
                                    <a className="block font-semibold" onClick={() => setOpcao({ status: false, choice: 9 })}>
                                        Análise de Dados
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className="p-8 bg-white border border-gray-300 rounded-lg shadow-lg text-center flex items-center justify-center">
                        <button className="text-right text-white font-semibold border border-secondary-300 rounded-full p-4 w-10 h-6 flex justify-center items-center bg-secondary hover:bg-primary"
                        onClick={() => setOpcao({status: true , choice: 0})}>
                        &lt;
                        </button>
                        <strong className="text-2xl font-bold ml-5 text-secondary">{dicionarioOpcao[opcao.choice]} </strong>
                    </div>
                )}
            </main>
        </div>
    );
}

export default MainPage;
