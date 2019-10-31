import Vue from 'vue';
import 'lib-flexible'; // 淘宝弹性布局方案
import App from './App.vue';
import store from './store/index';
import router from './router/index';
// import Vant from 'vant';
import './plugins/vant-ui.js'
import './styles/theme.scss'

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

