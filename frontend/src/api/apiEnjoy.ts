import axiosInstance from '../.config/axios';
import type { Event } from '../dto/enjoy.dto';
import EnjoyDto from '../dto/enjoy.dto';

class ApiEnjoy {
  static async getEnjoy(
    latitute: number,
    longitude: number,
    start_date: string,
    end_date: string,
  ): Promise<EnjoyDto[]> {
    try {
      const responce = await axiosInstance.get(
        `/enjoy?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      );

      if (responce.status === 200) {
        const enjoy = ApiEnjoy.convertEnjoyDto(responce.data._embedded.events);
        return enjoy;
      }
    } catch (error: any) {
      console.error('Error: ', error);
    }
    return [];
  }

  private static convertEnjoyDto(data: Event[]) {
    return data.map((enjoy: Event) => new EnjoyDto(enjoy));
  }
}

export default ApiEnjoy;
