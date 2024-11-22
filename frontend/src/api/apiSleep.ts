import axiosInstance from '../.config/axios';
import type { Event } from './dto/sleep.dto';
import SleepDto from './dto/sleep.dto';

class ApiSleep {
  static async getSleep(
    latitute: number,
    longitude: number,
    start_date: string,
    end_date: string,
  ): Promise<SleepDto[]> {
    try {
      const responce = (await axiosInstance.get(
        `/sleep?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`,
      )) as any;
      const sleep = ApiSleep.convertSleepDto(responce.data?.results as any);

      return sleep;
    } catch (error: any) {
      console.error('Error: ', error);
    }
    return [];
  }

  private static convertSleepDto(data: Event[]) {
    return data.map((sleep: Event) => new SleepDto(sleep));
  }
}

export default ApiSleep;
