import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default{
  state: {
    currentError: "unknown error",
    passed: true,
  },
  mutations: {
    setCurrentError: (state,payload) => {
      state.currentError = payload;
    },
    setPassed: (state,payload) => {
      state.passed = payload;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCurrentError: state => state.currentError,
    getPassed: state => state.passed,
  }
};
