import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:3333";

//Endpoints da empresa

export async function updateCompanyData(data: any) {
  try {
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");
    const response = await axios.put(
      `${API_URL}/companys/${company_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Dados Atualizados com sucesso!");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 502) {
          toast.error(error.message);
        } else if (error.response.status === 500) {
          toast.error(error.message);
        } else if (error.response.status === 503) {
          toast.error(error.message);
        } else if (error.response.status === 404) {
          toast.error(error.message);
        }
      } else {
        toast.error("Erro ao buscar dados da API");
      }
    }
    throw error;
  }
}

export async function fetchCompany(): Promise<any | null> {
  try {
    const company_id = localStorage.getItem("company_id");
    const response: AxiosResponse<any> = await axios.get(
      `${API_URL}/companys/${company_id}`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a empresa:", error);
    return null;
  }
}
