import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { TypeProduct } from "../pages/Products/ListProducts";

const API_URL = "http://localhost:3333";

export async function registerProduct(data: any) {
  try {
    const response = await axios.post(`${API_URL}/products`, data);
    if (response.status === 200) {
      toast.success("Produto cadastrado com sucesso!");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.message);
        } else if (error.response.status === 500) {
          toast.error(error.message);
        }
      } else {
        toast.error("Erro ao buscar dados da API");
      }
    }
    throw error;
  }
}

export async function fetchProducts(): Promise<TypeProduct[]> {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response: AxiosResponse<TypeProduct[]> = await axios.get(
      `${API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("A resposta da API não é um array");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
  }
}
