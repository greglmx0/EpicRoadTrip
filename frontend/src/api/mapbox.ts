import axiosInstance from '../.config/axios';

class ApiMapbox {
  static async getSuggestions(query: string) {
    try {
      const responce = await axiosInstance.get(
        `/mapbox/suggest?query=${query}`
      );
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
      const responce = await axiosInstance.get(
        `/mapbox/retrieve?mapbox_id=${mapboxId}`
      );
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
}

export default ApiMapbox;
