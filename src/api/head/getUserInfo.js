/*
 * @Author: your name
 * @Date: 2021-11-29 10:39:34
 * @LastEditTime: 2021-11-29 14:55:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\head\getUserInfo.js
 */
//import axios from "axios"; //创建一个axios实例
import Vue from "vue";
import qs from "qs";
import "../../utils/request.js";
export function getUserInfo(params) {
  return Vue.prototype.axios.get("/api/Common/GetBaseUserInfo", { params });
}
export function saveInfo(params, data) {
  console.log(data);
  return Vue.prototype.axios.post("/api/Comment/SaveHardSolution?" + qs.stringify(params), data);
}
