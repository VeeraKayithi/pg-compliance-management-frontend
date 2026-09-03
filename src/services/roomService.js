import apiClient from "./apiClient.js";

const URL = "/rooms";
export const getAllRooms = async () => (await apiClient.get(URL)).data;
export const getRoomById = async (id) => (await apiClient.get(`${URL}/${id}`)).data;
export const getRoomsByBuilding = async (buildingId) =>
  (await apiClient.get(`${URL}/building/${buildingId}`)).data;
export const createRoom = async (data) => (await apiClient.post(URL, data)).data;
export const updateRoom = async (id, data) => (await apiClient.put(`${URL}/${id}`, data)).data;
export const deleteRoom = async (id) => (await apiClient.delete(`${URL}/${id}`)).data;
