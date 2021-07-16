import axios from 'axios';

import config from './../../config';

const instance = axios.create({
    baseURL: config.baseURL,
});

export const handleAxiosToken = (AUTH_TOKEN) => {
    instance.defaults.headers.access_token = AUTH_TOKEN;
  };

export default instance;