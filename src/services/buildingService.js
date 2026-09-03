import apiClient from "./apiClient.js";

const URL = "/buildings";
export const getAllBuildings = async () => (await apiClient.get(URL)).data;
export const getBuildingById = async (id) => (await apiClient.get(`${URL}/${id}`)).data;
export const createBuilding = async (data) => (await apiClient.post(URL, data)).data;
export const updateBuilding = async (id, data) => (await apiClient.put(`${URL}/${id}`, data)).data;
export const deleteBuilding = async (id) => (await apiClient.delete(`${URL}/${id}`)).data;
