import Vue from 'vue'
import Vuex from 'vuex'
const jwt = require('jsonwebtoken');

import login from './modules/login';
import register from './modules/register';
import error from './modules/error';
import embedPowerBI from './modules/embedPowerBI';
import network from './api/network';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    register,
    error,
    embedPowerBI,
    network
  },
  getters: {
  }
});
