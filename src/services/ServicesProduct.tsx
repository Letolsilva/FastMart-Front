import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { TypeProduct } from "../pages/Products/ListProducts";
import { TypeProduct_lucas } from "../pages/Products/EditProducts";
import { Employee } from "../pages/ListEmployees";

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

export async function fetchJustOneProduct(
  id: number,
): Promise<TypeProduct_lucas | null> {
  try {
    const token = localStorage.getItem("authToken");
    const id_company = localStorage.getItem("company_id");
    const response: AxiosResponse<{ products: TypeProduct_lucas[] }> = await axios.get(
      `${API_URL}/products/${id_company}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const product = response.data.products.find((x) => x.id === id);
    return product || null;  // Retorna o produto encontrado ou null se não encontrado
  }
  catch (error) {
    console.error("Erro ao buscar o Produto:", error);
    return null;
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

export async function updateProductData(data: TypeProduct_lucas) {
  try {
    const token = localStorage.getItem("authToken");
    const company_id = localStorage.getItem("company_id");

    const response = await axios.put(
      `${API_URL}/products/${data.code}/${company_id}`,
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