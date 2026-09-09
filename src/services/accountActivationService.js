import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api/v1";

const activationClient = axios.create({
  baseURL: `${API_BASE_URL}/auth/activation`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

export const validateActivationToken = async (token) => {
  const response = await activationClient.get("/validate", {
    params: { token },
  });

  return response.data;
};

export const completeAccountActivation = async (activationData) => {
  const response = await activationClient.post(
    "/complete",
    activationData
  );

  return response.data;
};

export const resendActivationEmail = async (username) => {
  const response = await activationClient.post("/resend", {
    username,
  });

  return response.data;
};
