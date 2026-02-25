import axios from "axios";
import { authStore } from "../state/authStore";

function resolveApiBaseUrl() {
  const raw = (import.meta.env.VITE_API_BASE_URL || "/api").trim();
  if (!raw) return "/api";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/+$/, "");
  }
  return `/${raw.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

const baseURL = resolveApiBaseUrl();

export const http = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" }
});

let refreshPromise = null;
const pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  pendingQueue.length = 0;
};

http.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => {
    const contentType = String(res.headers?.["content-type"] || "").toLowerCase();
    if (contentType.includes("application/json") && res.data && typeof res.data === "object") {
      const envelope = res.data;
      if (Object.prototype.hasOwnProperty.call(envelope, "success") &&
          Object.prototype.hasOwnProperty.call(envelope, "timestamp")) {
        res.data = envelope.data;
      }
    }
    return res;
  },
  async (error) => {
    const { response, config } = error || {};
    if (!response || !config) {
      return Promise.reject(normalizeError(error));
    }

    const requestUrl = String(config.url || "");
    const isRefreshRequest = requestUrl.includes("/auth/refresh");
    if (response.status !== 401 || config.__isRetryRequest || isRefreshRequest) {
      return Promise.reject(normalizeError(error));
    }

    const { refreshToken, setTokens, logout } = authStore.getState();
    if (!refreshToken) {
      logout();
      return Promise.reject(normalizeError(error));
    }

    if (!refreshPromise) {
      refreshPromise = http
        .post("/auth/refresh", { refreshToken })
        .then((res) => {
          const { accessToken: newAccess, refreshToken: newRefresh } = res.data || {};
          setTokens(newAccess, newRefresh);
          processQueue(null, newAccess);
          return newAccess;
        })
        .catch((err) => {
          processQueue(err, null);
          logout();
          throw err;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      const newToken = await new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      });
      config.__isRetryRequest = true;
      config.headers.Authorization = `Bearer ${newToken}`;
      return http(config);
    } catch (err) {
      return Promise.reject(normalizeError(err));
    }
  }
);

export function normalizeError(error) {
  if (!error) return { message: "Unknown error" };
  const response = error.response;
  if (!response) {
    return {
      status: 0,
      code: error.code || "NETWORK_ERROR",
      message: "Network error. Please check connectivity and API server."
    };
  }

  const data = response.data || {};
  const payload = data && typeof data === "object" && Object.prototype.hasOwnProperty.call(data, "success")
    ? (data.data || {})
    : data;
  return {
    status: response.status,
    code: payload.code || data.code || data.error || null,
    message: data.message || payload.message || payload.error || data.error || "Request failed",
    errors: payload.errors || data.errors || null
  };
}

export default http;
