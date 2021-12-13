/*
 * @Author: your name
 * @Date: 2021-11-29 10:39:34
 * @LastEditTime: 2021-12-09 16:46:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 测试使用，调用接口的例子
 */
 import Vue from "vue";
 import qs from "qs";
 import "../../utils/request.js";
 export function GetClassExerciseTrait(params) {
   return Vue.prototype.axios.get("/api/TeacherRZZD/GetClassExerciseTrait?"+ qs.stringify(params));
 }
 export function GetClassLanguage(params) {
  return Vue.prototype.axios.get("/api/TeacherRZZD/GetClassLanguage?"+ qs.stringify(params));
}