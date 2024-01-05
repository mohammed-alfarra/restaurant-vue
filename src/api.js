import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:80/api/dashboard',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
