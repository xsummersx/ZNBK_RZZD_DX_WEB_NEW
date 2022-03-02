/*
 * @Author: 共同负责
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-31 10:45:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 路由
 */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  /*=====测试使用======*/
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test/test.vue"),
  },
  {
    path: "/Dialog",
    name: "Dialog",
    component: () => import("../views/test/Dialog.vue"),
  },
  {
    path: "/Messagebox",
    name: "Messagebox",
    component: () => import("../views/test/Messagebox.vue"),
  },
  /*=====测试使用======*/
  {
    path: "/error",
    name: "error",
    component: () => import("../views/error.vue"), //登录失效页面
    meta: { title: "登录失效" },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"), //教育局RZZD
    meta: { title: "大数据认知质量评估" },
    children: [
      {
        path: "/home/educationRZZD",
        name: "educationRZZD",
        component: () => import("../views/educationRZZD.vue"), //教育局领导
      },
      {
        path: "/home/schoolRZZD",
        name: "schoolRZZD",
        component: () => import("../views/schoolRZZD.vue"), //学校校领导
      },
      {
        path: "/home/gradeRZZD",
        name: "gradeRZZD",
        component: () => import("../views/gradeRZZD.vue"), //年级组长
      },
      {
        path: "/home/teacherRZZD",
        name: "teacherRZZD",
        component: () => import("../views/teacherRZZD.vue"), //学校校领导
      },
      {
        path: "/home/studentRZZD",
        name: "studentRZZD",
        component: () => import("../views/studentRZZD.vue"), //学校校领导
      },
    ],
  },
  {
    path: "/DiagReport",
    name: "DiagReport",
    component: () => import("../views/DiagReport.vue"), //薄弱诊断报告
    meta: { title: "薄弱诊断报告" },
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
