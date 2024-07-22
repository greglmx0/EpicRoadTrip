import axiosInstance from '../.config/axios';
import type { Event } from './dto/travel.dto';
import TravelDto from './dto/travel.dto';

class ApiTravel {
  static async getTravel(latitute: number, longitude: number, start_date: string, end_date: string) {
    try {
      const responce = await axiosInstance.get(
        `/travel?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      );
      const travel = ApiTravel.convertTravelDto(responce.data._embedded.events);
      return travel;
    } catch (error: any) {
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  private static convertTravelDto(data: Event[]) {
    return data.map((travel: Event) => new TravelDto(travel));
  }
}

export default ApiTravel;
