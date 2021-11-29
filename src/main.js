/*
 * @Author: your name
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-11-29 10:16:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//按需引入element.JS
import "./utils/element.js";
import "element-ui/lib/theme-chalk/index.css";
//引入Http请求
import "./utils/request.js";

Vue.config.productionTip = false;
//tab标签页名字
Vue.directive("title", {
  inserted: function (el) {
    document.title = el.dataset.title;
  },
});
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
