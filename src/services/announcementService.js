import apiClient from "./apiClient.js";

const URL = "/admin/announcements";

export const previewAnnouncement = async (channels) => {
  const response = await apiClient.post(`${URL}/preview`, { channels });
  return response.data;
};

export const sendAnnouncement = async (payload) => {
  const response = await apiClient.post(URL, payload);
  return response.data;
};

export const getAnnouncementHistory = async () => {
  const response = await apiClient.get(URL);
  return response.data;
};

export const getAnnouncementDeliveries = async (announcementId) => {
  const response = await apiClient.get(`${URL}/${announcementId}/deliveries`);
  return response.data;
};
