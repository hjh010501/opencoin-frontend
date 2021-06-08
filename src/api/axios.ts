import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export const BASE_URL = "https://open-coin-backend.herokuapp.com";

export const isAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
}
const fetchClient = () => {
  const defaultOptions = {
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }; 

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `JWT ${token}` : '';
    nprogress.start()
    return config;
  });

  instance.interceptors.response.use(result => {
    nprogress.done()
    return result
  }, err => {
    nprogress.done()
    throw err
  })

  return instance;
};

export default fetchClient();