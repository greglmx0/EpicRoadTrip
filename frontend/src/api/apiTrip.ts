import axiosInstance from '../.config/axios';
import type Event from '../dto/drink.dto';
import type TripDto from '../dto/trip.dto';

class ApiTrip {
  static async createTrip(trip: TripDto): Promise<TripDto | void> {
    try {
      const response = await axiosInstance.post('/trip', trip);
      if (response.status === 201) {
        return response.data as TripDto;
      }
    } catch (error: any) {
      console.error('Error: ', error);
    }
  }

  static async getTrip(id: string): Promise<TripDto | void> {
    try {
      const response = await axiosInstance.get(`/trip/${id}`);
      if (response.status === 200) {
        return response.data as TripDto;
      }
    } catch (error: any) {
      console.error('Error: ', error);
    }
  }

  static async getUserTrips(): Promise<TripDto[] | void> {
    try {
      const response = await axiosInstance.get('/trip');
      if (response.status === 200) {
        return response.data as TripDto[];
      }
    } catch (error: any) {
      console.error('Error: ', error);
    }
  }
}

export default ApiTrip;
