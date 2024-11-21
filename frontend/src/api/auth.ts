import { resourceUsage } from 'process';
import axiosInstance from '../.config/axios';
import { environment } from '../environments/environment';

class auth {
  static async register(username: string, email: string, password: string) {
    try {
      return await axiosInstance.post('/register', JSON.stringify({ username, email, password }));
    } catch (error: any) {
      console.log('Error: ', error);

      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async login(username: string, password: string) {
    try {
      const request = await axiosInstance.post('/login', JSON.stringify({ username, password }));
      const token = request?.data?.token;
      if (!token) {
        throw new Error('Token not found');
      }
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

  static async loginWithGoogle() {
    try {
      // redirect to google login page
      const uri = 'https://accounts.google.com/o/oauth2/v2/auth';
      const scope = 'email openid profile';
      const response_type = 'code';
      const redirect_uri = environment.GOOGLE_REDIRECT_URI;
      const client_id = environment.GOOGLE_CLIENT_ID;
      const url = `${uri}?scope=${scope}&response_type=${response_type}&redirect_uri=${redirect_uri}&client_id=${client_id}`;
      console.log('Redirecting to Google login page');

      window.location.href = url;
      return url;
    } catch (error: any) {
      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async loginWithGoogleCallback(code: string) {
    try {
      const request = await axiosInstance.post('/auth/google', JSON.stringify({ code }));
      console.log('Google Request: ', request);
      console.log('Token: ', request?.data?.token);

      const token = request?.data?.token;
      if (!token) {
        throw new Error('Token not found');
      }
      localStorage.setItem('token', token);
      return request;
    } catch (error: any) {
      /// throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async logout() {
    const request = await axiosInstance.post('/logout');
    localStorage.removeItem('token');
    return request;
  }

  static async getUserInfo() {
    try {
      return await axiosInstance.get('/user/info');
    } catch (error: any) {
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }
}

export default auth;
