import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:3333";

export async function getFunction() {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export async function PostFunction(data: any) {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    if (response.status === 200) {
      toast.success("Usuário cadastrado com sucesso!");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("CPF ou email já cadastrado");
        } else if (error.response.status === 500) {
          toast.error("Erro ao cadastrar usuário");
        }
      } else {
        toast.error("Erro ao buscar dados da API");
      }
    }

    throw error;
  }
}
