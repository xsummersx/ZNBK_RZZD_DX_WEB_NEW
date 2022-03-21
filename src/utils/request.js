import axios from 'axios';
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 60 * 5, //超时时间5分钟
});
//请求拦截器
// Axios.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
//响应拦截器
request.interceptors.response.use(
  (response) => {
    // 约定的错误码，按实际情况修改
    // token失效
    if (response.data.Code === -7 || response.data.Code === 10003) {
      // 跳转到错误页面
      // window.location.replace(window.location.origin + window.location.pathname + '#/error');
    } else if (response.data.Code === -1 || response.data.Code === -2) {
      // console.log(
      //   '接口出错',
      //   response.data.Message,
      //   window.location.host + response.config.baseURL + response.config.url
      // );
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
