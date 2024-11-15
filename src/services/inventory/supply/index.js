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

  export const updateOrderStatus = async (orderId, status) => {
    try {
      // Log data yang akan dikirim
      console.log("Updating order:", { orderId, status });
   
      // Memanggil endpoint
      if(status === "Completed"){
        await api.post(`/api/orders/${orderId}/receive`, { status });
      }else{
        await api.put(`/api/orders/${orderId}/cancel`, { status });
      }
      // Mengembalikan data dari response

    } catch (error) {
      console.error("Error updating order status:", error);
      throw error; // Melempar error jika terjadi
    }
  };


