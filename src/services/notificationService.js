import apiClient from "./apiClient.js";

const URL = "/notifications";

export const getMyNotifications = async () =>
  (await apiClient.get(`${URL}/me`)).data;

export const getMyUnreadNotifications = async () =>
  (await apiClient.get(`${URL}/me/unread`)).data;

export const getMyDismissedNotifications = async () =>
  (await apiClient.get(`${URL}/me/dismissed`)).data;

export const getMyUnreadCount = async () =>
  (await apiClient.get(`${URL}/me/unread-count`)).data;

export const markNotificationAsRead = async (notificationId) =>
  (await apiClient.put(`${URL}/${notificationId}/read`)).data;

export const dismissNotification = async (notificationId) =>
  (await apiClient.put(`${URL}/${notificationId}/dismiss`)).data;

export const markAllNotificationsAsRead = async () =>
  (await apiClient.put(`${URL}/me/read-all`)).data;
