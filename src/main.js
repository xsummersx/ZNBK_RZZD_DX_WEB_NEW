/*
 * @Author: your name
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-28 15:23:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/home.scss";
// import "../src/utils/request";
import "../src/assets/css/global.css";
import "../src/assets/css/common.scss";
import "../src/assets/css/elementReset.css";
import optionObj from "./assets/js/ChartsOption/chartsOption";
// 调用本地exe所需
import com from "./utils/Common";
//引入全局过滤器
import "./utils/filter";
//echarts
import * as echarts from "echarts";
//按需引入element.JS
import "./utils/element.js";
import "element-ui/lib/theme-chalk/index.css";
//滚动条样式
import global_Ops from "./utils/scrollops";
//引入Http请求
import "./utils/request.js";
//引入JQ，因为知识点课件的启动需要用到
import $ from "jquery";
Vue.prototype.$ = $;
Vue.prototype.$global_Ops = global_Ops; //滚动条
Vue.config.productionTip = false;
Vue.prototype.$optionObj = optionObj;
//echarts
Vue.prototype.$echarts = echarts;
//token失效后基础平台地址=>>error页面
Vue.prototype.$baseUrl = "http://172.16.41.237";
// 调用本地exe所需
Vue.prototype.$com = com;
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

// 10   43  35
