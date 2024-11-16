import { api } from "../../axios";

export const getDataDelivery = async () => {
    try {
      const response = await api.get('/api/deliveries');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const postDataDelivery = async (data) => {
    try {
        console.log("postdata", data)
      const response = await api.post('/api/deliveries', data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  export const updateDeliveryStatus = async (deliveryId, status) => {
    try {
      // Log data yang akan dikirim
      console.log("Updating delivery:", { deliveryId, status });
   
      // Memanggil endpoint
      if(status === "Completed"){
        await api.post(`/api/deliveries/${deliveryId}/confirm`, { status });
      }else{
        await api.put(`/api/deliveries/${deliveryId}/cancel`, { status });
      }
      // Mengembalikan data dari response

    } catch (error) {
      console.error("Error updating delivert status:", error);
      throw error; // Melempar error jika terjadi
    }
  };


