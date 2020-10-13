import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fcacb7a7df35.ngrok.io',
});

export default api;
