import apiClient from "./apiClient.js";

const TENANT_URL = "/tenants";

export const getAllTenants = async () => {
  const response = await apiClient.get(TENANT_URL);
  return response.data;
};

export const getTenantById = async (tenantId) => {
  const response = await apiClient.get(`${TENANT_URL}/${tenantId}`);
  return response.data;
};

export const getMyTenantProfile = async () => {
  const response = await apiClient.get(`${TENANT_URL}/me`);
  return response.data;
};

export const createTenant = async (tenantData) => {
  const response = await apiClient.post(TENANT_URL, tenantData);
  return response.data;
};

export const updateTenant = async (tenantId, tenantData) => {
  const response = await apiClient.put(
    `${TENANT_URL}/${tenantId}`,
    tenantData
  );

  return response.data;
};

export const markTenantAsLeft = async (tenantId) => {
  const response = await apiClient.put(
    `${TENANT_URL}/${tenantId}/leave`
  );

  return response.data;
};
