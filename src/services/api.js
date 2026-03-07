import axios from "axios";

const API_BASE_URL = "http://18.207.132.140:8000";

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