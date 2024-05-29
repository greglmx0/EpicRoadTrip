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
        `/mapbox/retrieve?mapbox_id=${mapboxId}`
      );
      if (responce.status === 200) {
        console.log('Response: ', responce);
        return responce;
        // const latitude = responce.data[0].geometry.coordinates[1];
        // const longitude = responce.data[0].geometry.coordinates[0];
        // return { latitude, longitude, ...responce.data[0] };
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
