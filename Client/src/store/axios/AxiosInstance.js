import apisauce from 'apisauce';

const URL = "https://serverappfood.herokuapp.com"

// const isntance = Axios.create({
//     baseURL: URL,
//     timeout: 20000,
// })

// isntance.interceptors.request.use(function(config) {
//     //token when has save to local
//     return config   
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// })

// export default isntance

const api = apisauce.create({
    baseURL: URL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  });
  
  export default api;