import apiClient from "./apiClient.js";

const NOTIFICATION_URL = "/notifications";

export const getMyNotifications = async () => {
  const response = await apiClient.get(
    `${NOTIFICATION_URL}/me`
  );

  return response.data;
};

export const getMyUnreadNotifications = async () => {
  const response = await apiClient.get(
    `${NOTIFICATION_URL}/me/unread`
  );

  return response.data;
};

export const getMyDismissedNotifications = async () => {
  const response = await apiClient.get(
    `${NOTIFICATION_URL}/me/dismissed`
  );

  return response.data;
};

export const getMyUnreadCount = async () => {
  const response = await apiClient.get(
    `${NOTIFICATION_URL}/me/unread-count`
  );

  return response.data;
};

export const markNotificationAsRead = async (
  notificationId
) => {
  const response = await apiClient.put(
    `${NOTIFICATION_URL}/${notificationId}/read`
  );

  return response.data;
};

export const dismissNotification = async (
  notificationId
) => {
  const response = await apiClient.put(
    `${NOTIFICATION_URL}/${notificationId}/dismiss`
  );

  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await apiClient.put(
    `${NOTIFICATION_URL}/me/read-all`
  );

  return response.data;
};