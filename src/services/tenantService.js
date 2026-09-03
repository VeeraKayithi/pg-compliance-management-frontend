import apiClient from "./apiClient.js";

const URL = "/tenants";
export const getAllTenants = async () => (await apiClient.get(URL)).data;
export const getTenantById = async (id) => (await apiClient.get(`${URL}/${id}`)).data;
export const createTenant = async (data) => (await apiClient.post(URL, data)).data;
export const updateTenant = async (id, data) => (await apiClient.put(`${URL}/${id}`, data)).data;
export const markTenantAsLeft = async (id) => (await apiClient.put(`${URL}/${id}/leave`)).data;
