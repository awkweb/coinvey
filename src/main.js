import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
