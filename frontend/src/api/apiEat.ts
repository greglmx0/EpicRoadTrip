import axiosInstance from '../.config/axios';
import type { Event } from '../dto/eat.dto';
import EatDto from '../dto/eat.dto';

class ApiEat {
  static async getEat(latitute: number, longitude: number, start_date: string, end_date: string): Promise<EatDto[]> {
    try {
      const responce = (await axiosInstance.get(
        `/eat?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      )) as any;
      const eat = ApiEat.convertEatDto(responce.data?.results as any);

      return eat;
    } catch (error: any) {
      console.error('Error: ', error);
    }
    return [];
  }

  private static convertEatDto(data: Event[]) {
    return data.map((eat: Event) => new EatDto(eat));
  }
}

export default ApiEat;
