import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c68a8617e0ed.ngrok.io',
});

export default api;
