import axios from 'axios';
import { environment } from '../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
