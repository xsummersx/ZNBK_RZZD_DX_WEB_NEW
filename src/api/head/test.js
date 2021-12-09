/*
 * @Author: your name
 * @Date: 2021-11-29 10:39:34
 * @LastEditTime: 2021-12-01 09:59:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 测试使用，调用接口的例子
 */
import Vue from "vue";
import qs from "qs";
import "../../utils/request.js";
export function getUserInfo(params) {
  return Vue.prototype.axios.get("/api/Common/GetBaseUserInfo", { params });
}
export function saveInfo(params, data) {
  return Vue.prototype.axios.post("/api/Comment/SaveHardSolution?" + qs.stringify(params), data);
}
export function GetClassHeadDetailInfo(params) {
  return Vue.prototype.axios.get("/api/RZZD/GetClassHeadDetailInfo?" , { params });
}