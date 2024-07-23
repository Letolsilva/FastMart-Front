import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Employee } from "../pages/ListEmployees";
const API_URL = "http://localhost:3333";

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response: AxiosResponse<{ users: Employee[] }> = await axios.get(
      `${API_URL}/users`
    );

    if (Array.isArray(response.data.users)) {
      return response.data.users;
    } else {
      throw new Error("A resposta da API não é um array");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
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
          toast.error("Erro ao realizar cadastrado");
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
