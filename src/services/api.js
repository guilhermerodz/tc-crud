import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://tchml.tradersclub.com.br:12000/api',
  baseURL: 'http://private-anon-980cf50171-tradersclubapi.apiary-proxy.com/api',
});

export default api;
