import axios from 'axios';

const api = axios.create({
  baseURL: 'https://31e250e6490e.ngrok.io',
});

export default api;

// baseURL: 'https://fordva-aylrs.ondigitalocean.app',
