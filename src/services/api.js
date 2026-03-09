import axios from "axios";

const API_BASE_URL =
  "https://rytauw63eb.execute-api.eu-north-1.amazonaws.com/prod";

// --- Disease Prediction Endpoints ---

export const predictBreast = async (formData) => {
  return axios.post(`${API_BASE_URL}/predict/breast`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const predictCervical = async (formData) => {
  return axios.post(`${API_BASE_URL}/predict/cervical`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const predictPCOS = async (formData) => {
  return axios.post(`${API_BASE_URL}/predict/pcos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// --- Patient Session Endpoints ---

export const startPatientSession = async (data) => {
  return axios.post(`${API_BASE_URL}/patient/start`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const savePatientTest = async (data) => {
  return axios.post(`${API_BASE_URL}/patient/test/save`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};