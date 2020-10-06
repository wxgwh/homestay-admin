import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "u-reset.css";

import filter from '@/filter'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.filter('formateTime',filter["formateTime"])

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')