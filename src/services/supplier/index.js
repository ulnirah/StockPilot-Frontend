import { api } from "../axios";

export const getDataSupplier = async () => {
    try {
      const response = await api.get('/api/suppliers');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };