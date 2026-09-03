const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";

export const saveAuthentication = (authData) => {
  if (!authData?.token || !authData?.role) {
    throw new Error("Invalid authentication response.");
  }

  localStorage.setItem(TOKEN_KEY, authData.token);

  localStorage.setItem(
    USERNAME_KEY,
    authData.username || ""
  );

  localStorage.setItem(
    ROLE_KEY,
    authData.role.toUpperCase()
  );
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
};

const decodeTokenPayload = (token) => {
  try {
    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) {
      return null;
    }

    let base64Url = tokenParts[1];

    let base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    while (base64.length % 4 !== 0) {
      base64 += "=";
    }

    const decodedPayload = window.atob(base64);

    const jsonPayload = decodeURIComponent(
      decodedPayload
        .split("")
        .map((character) => {
          const code = character
            .charCodeAt(0)
            .toString(16)
            .padStart(2, "0");

          return `%${code}`;
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error(
      "Unable to decode JWT token:",
      error
    );

    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const payload = decodeTokenPayload(token);

  if (!payload) {
    return true;
  }

  /*
   * If the backend JWT does not contain
   * an expiration field, do not reject it here.
   */
  if (!payload.exp) {
    return false;
  }

  const currentTimeInSeconds =
    Math.floor(Date.now() / 1000);

  return payload.exp <= currentTimeInSeconds;
};

export const isAuthenticated = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    logoutUser();
    return false;
  }

  return true;
};

export const hasRole = (
  allowedRoles = []
) => {
  const role = getRole();

  if (!role) {
    return false;
  }

  const normalizedRole =
    role.toUpperCase();

  const normalizedAllowedRoles =
    allowedRoles.map((allowedRole) =>
      allowedRole.toUpperCase()
    );

  return normalizedAllowedRoles.includes(
    normalizedRole
  );
};