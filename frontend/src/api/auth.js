import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Login user
export const loginUser = (formData) => API.post("/auth/login", formData);

// Signup user
export const signupUser = (formData) => API.post("/auth/signup", formData);
