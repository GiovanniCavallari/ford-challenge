import axios from 'axios';

const api = axios.create({
  baseURL: 'https://18434a895661.ngrok.io',
});

export default api;
