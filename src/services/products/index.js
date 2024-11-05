import { api } from "../axios";

export const getDataProduct = async () => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export const postDataProduct = async (data) => {
    try {
      const response = await api.post('/api/products', data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

