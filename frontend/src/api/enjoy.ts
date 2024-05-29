import axiosInstance from '../.config/axios';

class ApiEnjoy {
  static async getEnjoy(
    latitute: number,
    longitude: number,
    start_date: string,
    end_date: string
  ) {
    try {
      const responce = await axiosInstance.get(
        `/enjoy?latitute=${latitute}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`
      );
      console.log('Response: ', responce);
      return responce;
    } catch (error: any) {
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }
}

export default ApiEnjoy;
