import axios from 'axios';

const api = axios.create({
  baseURL: 'https://75b8ea8475fb.ngrok.io',
});

export default api;
