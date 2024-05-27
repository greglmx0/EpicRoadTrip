import axiosInstance from '../.config/axios';

class ApiMapbox {
  static async getSuggestions(query: string) {
    try {
      // create get request to /mapbox/suggest?query=${query}
      const responce = await axiosInstance.get(
        `/mapbox/suggest?query=${query}`
      );
      console.log('Response: ', responce);
      return responce;
    } catch (error: any) {
      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }

  static async getRetrieve(mapboxId: string) {
    try {
      const responce = await axiosInstance.get(
        `/mapbox/retrieve/mapbox_id=${mapboxId}`
      );
      console.log('Response: ', responce);
      return responce.data;
    } catch (error: any) {
      // throw new Error(error.response.data.message);
      return {
        status: error.response.status,
        data: { message: error.response.data.message },
      };
    }
  }
}

export default ApiMapbox;
