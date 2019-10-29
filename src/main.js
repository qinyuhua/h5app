import Vue from 'vue';
import 'lib-flexible'; // 淘宝弹性布局方案
import App from './App.vue';
// import Vant from 'vant';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

