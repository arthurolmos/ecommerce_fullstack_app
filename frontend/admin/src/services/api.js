import axios from 'axios'

import Auth from './Auth'
import errorHandler from '../utils/errorHandler'

const api = axios.create({ baseURL: 'http://localhost:3333'})

api.interceptors.request.use(async (config) => {
  // if (
  //   !config.url.endsWith('login') ||
  //   !config.url.endsWith('refresh') ||
  //   !config.url.endsWith('register')
  // ) {
  //   const userTokenExpiration = new Date(await localStorage.getItem('expires'))
  //   const today = new Date()

  //   if (today > userTokenExpiration) {
  //     console.log(today > userTokenExpiration)
  //     // refresh the token here
  //     const userRefreshToken = await localStorage.getItem('refreshToken');

  //   } else {
  //     console.log('here')

      const userToken = await localStorage.getItem('token')
      if(userToken)
        config.headers.Authorization = userToken
    // }
  // }

  return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
    
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error.response.status ? error.response.status : '' 

    if(status === 500)
      console.log('Error 500')

    if(status === 401)
      new Auth().logout()

    return Promise.reject(error);
  });

export default api