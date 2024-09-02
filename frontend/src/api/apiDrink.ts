import axiosInstance from '../.config/axios';
import type { Event } from './dto/drink.dto';
import DrinkDto from './dto/drink.dto';

class ApiDrink {
  static async getDrink(
    latitute: number,
    longitude: number,
    start_date: string,
    end_date: string,
  ): Promise<DrinkDto[]> {
    try {
      const responce = (await axiosInstance.get(
        `/drink?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      )) as any;
      const drink = ApiDrink.convertDrinkDto(responce.data?.results as any);

      return drink;
    } catch (error: any) {
      console.error('Error: ', error);
    }
    return [];
  }

  private static convertDrinkDto(data: Event[]) {
    return data.map((drink: Event) => new DrinkDto(drink));
  }
}

export default ApiDrink;
