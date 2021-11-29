/*
 * @Author: your name
 * @Date: 2021-11-29 09:55:06
 * @LastEditTime: 2021-11-29 10:28:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\utils\request.js
 */
import axios from "axios"; //创建一个axios实例
import Vue from "vue";
// 引入vuescroll
import VueAxios from "vuescroll";
import router from "../router";
//elementUI自定义样式
import "./../assets/css/messagebox/elementReset_Messagebox.scss";
Vue.use(VueAxios, axios);
const Axios = axios.create({
  baseURL: "", //填写基础平台地址
  timeout: 1000 * 60 * 5, //超时时间5分钟
});
//请求拦截器-增加一个token参数
Axios.interceptors.request.use(
  (config) => {
    let loginToken = router.query.token;
    if (loginToken != null) {
      if (config.method == "post") {
        config.data.token = loginToken;
      } else if (config.method == "get") {
        config.url += "&Token=" + loginToken;
      }
    } else {
      //跳转到错误页面
      window.location.origin + window.location.pathname + "#/error";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//响应拦截器
Axios.interceptors.response.use(
  (response) => {
    //token失效
    if (response.data.Code == -7) {
      //跳转到错误页面
      window.location.replace(window.location.origin + window.location.pathname + "#/error");
    } else if (response.data.Code == -1 || response.data.Code == -2) {
      Vue.prototype.$message({
        type: "error",
        message: response.data.Message,
      });
      console.log("接口出错", response.data.Message, window.location.host + response.config.baseURL + response.config.url);
    } else if (response.data.Code == 10003) {
      window.location.replace(window.location.origin + window.location.pathname + "#/error");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
