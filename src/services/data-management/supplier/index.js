import { api } from "../../axios";

export const getDataSupplier = async () => {
    try {
      const response = await api.get('/api/suppliers');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

export const postDataSupplier = async (data) => {
  try {
    const response = await api.post('/api/suppliers', data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteDataSupplier = async (id) => {
  try {
    const response = await api.delete(`/api/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateDataSupplier = async (id, data) => {
  try {
    const response = await api.put(`/api/suppliers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};