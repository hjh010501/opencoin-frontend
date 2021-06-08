import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const fetchClient = () => {
  const defaultOptions = {
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
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