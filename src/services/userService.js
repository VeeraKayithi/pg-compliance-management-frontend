import apiClient from "./apiClient.js";

const USER_URL = "/users";

export const createTenantAccount = async (accountData) => {
  const response = await apiClient.post(
    `${USER_URL}/tenant-account`,
    accountData
  );

  return response.data;
};
