import axios from 'axios';

const axiosAddressCepApiInstance = axios.create({
  baseURL: import.meta.env.VITE_ADDRESS_CEP_API,
});

export default axiosAddressCepApiInstance;
