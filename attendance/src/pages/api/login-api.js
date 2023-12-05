import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-type": "application/json",
    },
});

export const updateUser = (userId, user) =>
    apiClient.put(`users/${userId}`, user);
export const deleteUser = (id) => apiClient.delete(`users/${id}`);

export const createUser = (user) =>
    apiClient.post("/register", user);

export const userLogin = (user) => apiClient.post("/login", user);
