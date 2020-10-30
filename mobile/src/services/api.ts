import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fordva-aylrs.ondigitalocean.app',
});

export default api;
