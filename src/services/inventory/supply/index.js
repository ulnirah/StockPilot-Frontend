import { api } from "../../axios";

export const getDataOrder = async () => {
    try {
      const response = await api.get('/api/orders');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const postDataOrder = async (data) => {
    try {
        console.log("postdata", data)
      const response = await api.post('/api/orders', data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };
