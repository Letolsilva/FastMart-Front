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
