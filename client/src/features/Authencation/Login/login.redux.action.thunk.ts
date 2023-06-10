import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { LoginCredentials } from "./login.type";
import { LOGIN_API_ENDPOINT } from "./login.constant";

export const login = createAsyncThunk<string, LoginCredentials>('auth/login', async (credentials) => {
  try {
    const response = await axios.post(LOGIN_API_ENDPOINT, credentials);
    return response.data.token;
  } catch (error: any) {
  
    throw new Error(error.response?.data?.message || 'Login failed');
  }
});