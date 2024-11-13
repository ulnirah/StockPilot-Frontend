import { api } from "@/services/axios";


export const loginUser = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      return response.data; // Biasanya mengembalikan token atau data pengguna
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };