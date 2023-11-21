// client/src/services/authService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de la API
// Función para realizar el registro de usuario
export const register = async (userData: any): Promise<any> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Función para realizar el inicio de sesión
export const login = async (userData: any): Promise<any> => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Función para obtener la información del usuario
export const getUserInfo = async (): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/user-info`, { headers: { Authorization: token } });
  return response.data;
};
