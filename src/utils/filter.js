/*
 * @Author: your name
 * @Date: 2020-09-04 08:58:57
 * @LastEditTime: 2021-12-29 14:09:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \znbk_znftd_zx_web\src\filter\filter.js
 */
import Vue from "vue";

// 全局过滤器
// x.xx转换为百分数
Vue.filter("toPercent", function (value, i) {
  if (value == -1) {
    return "--";
  } else if (value <= 1 && value >= 0) {
    value = Number((value * 100).toFixed(i));
    return value;
  } else {
    value = Number((-value * 100).toFixed(i));
    return value;
  }
});
//超出省略
Vue.filter("stringCut", function (value, i) {
  if (value && value.length > i) {
    //字符最大长度
    value = value.substring(0, i) + "..."; //超过省略
  }
  return value;
});
