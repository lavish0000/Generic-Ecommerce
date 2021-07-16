import { API_TYPE } from '../../utils/constants';
import axios from './axiosOrders';

export const makeRequest = async ({type = API_TYPE.GET, endpoint, data = {}, params = {}, headers = {}, add_token = true}) => {
      try {
        const config = {
          method: type,
          url: endpoint,
          headers: {add_token}
        };
        if (Object.keys(headers)) config.headers = headers;
        if (Object.keys(data)) config.data = data;
        if (Object.keys(params)) config.params = params;
        // axios.
        !add_token && delete axios.defaults.headers.access_token;
        const response = await axios(config);
        return [response.data, null];
      } catch (error) {
        console.error(`Error in -- ${endpoint} -- API Call`, error);
        return [null, error.response.data];
      }
  };