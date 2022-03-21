import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/hello',
    component: () => import('@/views/Hello.vue'),
  },
  {
    path: '/jsx',
		name: 'jsx',
    component: () => import('@/views/JsxExample'),
  },
  {
    path: '/chart',
		name: 'chart',
    component: () => import('@/views/EChartsExample.vue'),
  },
  {
    path: '/request',
		name: 'request',
    component: () => import('@/views/RequestExample.vue'),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
