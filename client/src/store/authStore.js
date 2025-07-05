import { create } from 'zustand'
import {axiosInstance} from '../lib/axois'

const useAuth = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isLoginning: false,
  isRegistering: false,
  authenticate: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify')
      const user = response.data.user;
      set({ user, isCheckingAuth : false });
    }
    catch (error) {
      console.error("Authentication failed:", error);
      set({ user: null, isCheckingAuth: false });
    }
    finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (email, password) => {
    set({ isLoginning: true });
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const user = response.data.user;
      set({ user, isLoginning: false });
      console.log(user);
    } catch (error) {
      console.error("Login failed:", error);
      set({ isLoginning: false });
    }
  },
  register: async (username, email, password, phone) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post('/auth/register', { username, email, password, phone });
      const user = response.data.user;
      set({ user, isRegistering: false });
    } catch (error) {
      console.error("Registration failed:", error);
      set({ isRegistering: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}))

export default useAuth
