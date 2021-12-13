/*
 * @Author: 共同负责
 * @Date: 2021-11-29 09:55:06
 * @LastEditTime: 2021-12-13 09:18:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 拦截器
 */
import axios from "axios"; //创建一个axios实例
import Vue from "vue";
//import router from "./router";
//elementUI自定义样式
import "./../assets/js/messagebox/elementReset_Messagebox.scss";
const Axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 * 5, //超时时间5分钟
});
Vue.prototype.axios = Axios;
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
Axios.interceptors.response.use(
  (response) => {
    //token失效
    if (response.data.Code == -7) {
      //跳转到错误页面
      // window.location.replace(window.location.origin + window.location.pathname + "#/error");
    } else if (response.data.Code == -1 || response.data.Code == -2) {
      Vue.prototype.$message({
        type: "error",
        message: response.data.Message,
      });
      console.log("接口出错", response.data.Message, window.location.host + response.config.baseURL + response.config.url);
    } else if (response.data.Code == 10003) {
      // window.location.replace(window.location.origin + window.location.pathname + "#/error");
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
