import { api } from "../../axios";

export const getDataRetailer = async () => {
    try {
      const response = await api.get('/api/retailers');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

export const postDataRetailer = async (data) => {
  try {
    const response = await api.post('/api/retailers', data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteDataRetailer = async (id) => {
  try {
    const response = await api.delete(`/api/retailers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateDataRetailer = async (id, data) => {
  try {
    const response = await api.put(`/api/retailers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};