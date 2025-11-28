// src/api/authApi.js
import axios from "axios";

const RAW_BASE = import.meta.env.VITE_WEB_API ;
const baseURL = RAW_BASE.endsWith("/") ? RAW_BASE.slice(0, -1) : RAW_BASE;

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const ok = (res) => ({
  ok: true,
  status: res.status,
  message: res.data?.message || res.data?.msg || "",
  data: res.data || null,
});
const toNiceError = (error) => {
  if (error?.response) {
    const { status, data } = error.response;
    return { ok: false, status, message: data?.message || data?.msg || `Request failed (${status}).`, data };
  }
  if (error?.request) return { ok: false, status: 0, message: "Network error: could not reach server.", data: null };
  return { ok: false, status: 0, message: error?.message || "Unexpected error.", data: null };
};

// 🔹 Step 1: initiate
export async function signupInitiateApi({ firstname, lastname, email, password, role }) {
  try {
    const res = await api.post("/auth/signup/initiate", { firstname, lastname, email, password, role });
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}

// 🔹 Step 2: complete (with OTP)
export async function signupCompleteApi({ firstname, lastname, email, password, role, otp }) {
  try {
    const res = await api.post("/auth/signup/complete", { firstname, lastname, email, password, role, otp });
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}

export async function signinApi({ email, password }) {
  try {
    const res = await api.post("/auth/signin", { email, password });
    return ok(res);
  } catch (err) {
    return toNiceError(err);
  }
}
