import api from "./api";

export const getAllProperties = async (filters = {}) => {
  const params = {};
  if (filters.city) params.city = filters.city;
  if (filters.category) params.category = filters.category;

  const response = await api.get("/properties", { params });
  return response.data;
};

export const getPropertyById = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}`);
  return response.data;
};