import { routes } from './../app/app.routes';
import axiosInstance from '../.config/axios';

class ApiMapbox {
  static async getSuggestions(query: string) {
    try {
      const responce = await axiosInstance.get(`/mapbox/suggest?query=${query}`);
      return responce;
    } catch (error: any) {
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async getRetrieve(mapboxId: string) {
    try {
      const responce = await axiosInstance.get(`/mapbox/retrieve?mapbox_id=${mapboxId}`);
      if (responce.status === 200) {
        return responce;
      } else {
        throw new Error(responce.data.message);
      }
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async getTrip(depart: [lat: number, lon: number], arrive: [lat: number, lon: number], routing: string) {
    try {
      const responce = await axiosInstance.get(
        `/mapbox/trip?depart_lat=${depart[0]}&depart_lon=${depart[1]}&arrive_lat=${arrive[0]}&arrive_lon=${arrive[1]}&routing=${routing}`,
      );
      if (responce.status === 200) {
        return responce.data;
      } else {
        throw new Error(responce.data.message);
      }
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.response.data.message);
    }
  }
}

export default ApiMapbox;
