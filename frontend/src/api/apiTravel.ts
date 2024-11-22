import axiosInstance from '../.config/axios';
import type { Event } from '../dto/travel.dto';
import TravelDto from '../dto/travel.dto';

class ApiTravel {
  static async getTravel(
    latitute: number,
    longitude: number,
    start_date: string,
    end_date: string,
  ): Promise<TravelDto[]> {
    try {
      const responce = await axiosInstance.get(
        `/travel?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      );

      if (responce.status === 200) {
        const travel = ApiTravel.convertTravelDto(responce.data._embedded.events);
        return travel;
      }
    } catch (error: any) {
      console.error('Error: ', error);
    }
    return [];
  }

  private static convertTravelDto(data: Event[]) {
    return data.map((travel: Event) => new TravelDto(travel));
  }
}

export default ApiTravel;
