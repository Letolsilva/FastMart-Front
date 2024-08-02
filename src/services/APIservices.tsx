import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Employee } from "../pages/ListEmployees";
const API_URL = "http://localhost:3333";
import { useNavigate } from "react-router-dom";

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response: AxiosResponse<{ users: Employee[] }> = await axios.get(
      `${API_URL}/users`
    );

    if (Array.isArray(response.data.users)) {
      return response.data.users;
    }
    else {
      throw new Error("A resposta da API não é um array");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
  }
}

export async function fetchJustOneEmployee(id: number): Promise<Employee | null> {
  try{
    const response: AxiosResponse<{users: Employee[]}> = await axios.get(`${API_URL}/users`);
    const employee = response.data.users.find(user => user.id === id);
    return employee || null;
  }
  catch(error){
    console.error('Erro ao buscar o funcionário:', error);
    return null;
  }
}

export async function updateEmployeeData(data: Employee) {
  try{
    const response = await axios.put(`${API_URL}/users/:${data.id}`,data);
    if(response.status === 200){
      toast.success("Dados Atualizados com sucesso!");
    }
    return response.data;
  } 
  catch(error: unknown){
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 502) {
          toast.error(error.message);
        } else if (error.response.status === 500) {
          toast.error(error.message);
        }
        else if (error.response.status === 503) {
          toast.error(error.message);
        }
        else if (error.response.status === 404) {
          toast.error(error.message);
        }
      } else {
        toast.error("Erro ao buscar dados da API");
      }
    }
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

export async function PostLogin(
  data: any,
  navigate: ReturnType<typeof useNavigate>
) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    if (response.status === 200) {
      toast.success("Usuário logado com sucesso!");
      navigate("/main");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("E-mail ou senha incorretos!");
        } else if (error.response.status === 403) {
          toast.error("Usuário já logado!");
        }
      } else {
        toast.error("Erro ao buscar dados da API");
      }
    }

    throw error;
  }
}

export async function PostLogout(
  id: any,
  navigate: ReturnType<typeof useNavigate>
) {
  try {
    const response = await axios.post(`${API_URL}/users/logout/:${id}`);
    if (response.status === 200) {
      toast.success("Usuário deslogado com sucesso!");
      navigate("/login");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 500) {
          toast.error("Erro ao deslogar!");
        } 
      }
    }

    throw error;
  }
}
