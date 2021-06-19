import Vue from 'vue';
import 'lib-flexible'; // 淘宝弹性布局方案
import App from './App.vue';
import store from './store/index';
import router from './router/index';
import './plugins/vant-ui.js'
import './styles/theme.scss'
import service from '@/utils/request';

Vue.config.productionTip = false;
Vue.prototype.service = service;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

