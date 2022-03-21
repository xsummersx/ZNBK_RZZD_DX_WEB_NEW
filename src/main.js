import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ECharts from 'vue-echarts';
import './plugin/echarts'
import 'virtual:windi.css';

const app = createApp(App);

// 全局组件v-chart
app.component('v-chart', ECharts);
app.use(router).use(store).mount('#app');
