import Vue from 'vue';
import Vuex from 'vuex';

import coinvey from './modules/coinvey';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    coinvey,
  },
});

export default store;
