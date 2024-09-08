import { useEffect } from "react";
import { Header } from "../../../components/Header";

export const Analysis: React.FC = () => {
    const redirectToDashboard = () => {
        const company_id = localStorage.getItem("company_id")
        let analysisWindow = window.open(`http://localhost:3333/analysis`, "_blank");
    
        setTimeout(() => {
          if (analysisWindow && !analysisWindow.closed) {
            analysisWindow.close();
          }
          window.open("http://localhost:8501", "_blank");
        }, 3000);
      };
    
      // useEffect para executar a função assim que o componente for montado
      useEffect(() => {
        redirectToDashboard();
      }, []); // O array vazio [] garante que o efeito será executado apenas uma vez, no carregamento
    
      return(
        <div>
          <Header showIcon={true} backRoute="/main" />
          <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
            <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                Redirecionando para o dashboard...
              </h2>
            </div>
          </div>
        </div>
      );
}