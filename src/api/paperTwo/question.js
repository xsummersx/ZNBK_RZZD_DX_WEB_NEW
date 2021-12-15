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
 import request from "@/utils/request.js";
 export function GetClassExerciseTrait(params) {
   return Vue.prototype.axios.get("/api/TeacherRZZD/GetClassExerciseTrait?"+ qs.stringify(params));
 }
//  export function GetClassLanguage(params) {
//   return Vue.prototype.axios.get("/api/TeacherRZZD/GetClassLanguage?"+ qs.stringify(params));
// }

// 教师端语言能力
export function GetClassLanguage(data){
  return request({
      url:"/api/TeacherRZZD/GetClassLanguage",
      method:"GET",
      params:{
          ...data
      }
  })
}
// 教师端语言能力弹窗
export function GetClassLanguageDetail(data){
  return request({
      url:"/api/TeacherRZZD/GetClassLanguageDetail_V3",
      method:"GET",
      params:{
          ...data
      }
  })
}

// 教师端语法认知
export function GetClassGrammer(data){
  return request({
      url:"/api/TeacherRZZD/GetClassGrammer_V3",
      method:"GET",
      params:{
          ...data
      }
  })
}
// 教师端语法认知掌握程度弹窗
export function GetClassGrammerList(data){
  return request({
      url:"/api/TeacherRZZD/GetClassGrammerList_V3",
      method:"GET",
      params:{
          ...data
      }
  })
}

// 教师端词汇认知
export function GetClassVocabulary(data){
  return request({
      url:"/api/TeacherRZZD/GetClassVocabulary_V3",
      method:"GET",
      params:{
          ...data
      }
  })
}
// 教师端词汇认知弹窗
export function GetClassVocaConclusionDetail(data){
  return request({
      url:"/api/TeacherRZZD/GetClassVocaConclusionDetail_V3",
      method:"GET",
      params:{
          ...data
      }
  })
}
