import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE 

export async function createPost(formData, onUploadProgress) {
  return axios.post(`${API_BASE}/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
}
