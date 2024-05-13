import { log } from 'node:console';
import axiosInstance from '../src/.config/axios';

class auth {
  static async register(username: string, email: string, password: string) {
    try {
      return await axiosInstance.post(
        '/register',
        JSON.stringify({ username, email, password })
      );
    } catch (error: any) {
      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async login(username: string, password: string) {
    try {
      const request = await axiosInstance.post(
        '/login',
        JSON.stringify({ username, password })
      );
      const token = request?.data?.token;
      localStorage.setItem('token', token);
      return request;
    } catch (error: any) {
      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }
}

export default auth;
