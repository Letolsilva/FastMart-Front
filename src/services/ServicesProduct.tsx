import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { TypeProduct } from "../pages/Products/ListProducts";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3334";

export async function registerProduct(data: any) {
  try {
    const company_id = localStorage.getItem("company_id");

    const response = await axios.post(
      `${API_URL}/finances/${company_id}`,
      data
    );
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

export async function fetchFinances(): Promise<TypeProduct[]> {
  try {
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response: AxiosResponse<{ finances: TypeProduct[] }> =
      await axios.get(`${API_URL}/finances/${company_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(response.data.finances);

    if (Array.isArray(response.data.finances)) {
      return response.data.finances;
    } else {
      throw new Error("A resposta da API não contém um array de produtos");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
  }
}

export async function fetchProducts(): Promise<TypeProduct[]> {
  try {
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response: AxiosResponse<{ products: TypeProduct[] }> =
      await axios.get(`${API_URL}/products/${company_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      throw new Error("A resposta da API não contém um array de produtos");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
  }
}

export async function fetchSales(): Promise<any[]> {
  try {
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response: AxiosResponse<{ finances: any[] }> =
      await axios.get(`${API_URL}/finances/${company_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.finances);
      
    if (Array.isArray(response.data.finances)) {
      return response.data.finances;
    } else {
      throw new Error("A resposta da API não contém um array de vendas");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Erro ao buscar dados da API");
  }
}

export async function deleteProduct(
  code: any,

  navigate: ReturnType<typeof useNavigate>){
    try {
      const token = localStorage.getItem("authToken");
      const company_id = localStorage.getItem("company_id");
      const response = await axios.delete(`${API_URL}/products/${code}/${company_id}`,{

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Produto deletado com sucesso!");
      navigate("/product/list");
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Produto não encontrado!");
        } else if (error.response.status === 500) {
          toast.error("Erro interno!");
        }
      }
      navigate("/product/list");
    }
    
    throw error;
  }
}


export async function recordSale(data: any, navigate: ReturnType<typeof useNavigate>){
  try{
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");
    const response = await axios.post(`${API_URL}/finances/sales/${company_id}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status === 201){
      toast.success("Venda realizada com sucesso!");
      navigate("/main");
    }
    return response.data;
  } catch(error: unknown){
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Produto não encontrado!");
        } else if (error.response.status === 500) {
          toast.error("Erro interno!");
        }
        else if(error.response.status === 400){
          const errorMessage = error.response.data.message || "Erro na solicitação!";
          toast.error(errorMessage);
        }
      }
    }

    throw error;
  }
}

export async function deleteSale(
  id: any,

  navigate: ReturnType<typeof useNavigate>){
    try {
      const token = localStorage.getItem("authToken");
      const company_id = localStorage.getItem("company_id");
      const response = await axios.delete(`${API_URL}/finances/cancel-sale/${company_id}`,{

        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          saleId: id
        }
      }

    );
    toast.success("Venda cancelada com sucesso!");
    navigate("/main");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Registro não encontrado!");
        } else if (error.response.status === 500) {
          toast.error("Erro interno!");
        }
      }
      navigate("/cancel-sale");
    }
    
    throw error;
  }
}


// Função para buscar produtos que estão prestes a vencer
export const getExpiringProducts = async (days: number) => {
  try {
    const company_id = localStorage.getItem("company_id");

    const response = await axios.get(
      `${API_URL}/products/get-expiring-products/${company_id}?days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos que vão vencer:", error);
    throw error;
  }
};

