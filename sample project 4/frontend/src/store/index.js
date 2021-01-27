import Vue from 'vue'
import Vuex from 'vuex'


import login from './modules/login';
import register from './modules/register';
import network from './modules/network';
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    login,
    register,
    network
  }
});
