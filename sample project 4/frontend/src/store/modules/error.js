import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default{
  state: {
    currentError: "unknown error",
    passed: true,
  },
  mutations: {
    setCurrentError: async (state,payload) => {
      state.currentError = await payload;           //<< do this for all and move all trys and catches to js
    },
    setPassed: (state,payload) => {
      state.passed = payload;
    }
  },
  actions: {
      setCurrentError: (context,payload) => {
      context.commit('setCurrentError',payload)
    }
  },
  getters: {
    getCurrentError: state => state.currentError,
    getPassed: state => state.passed,
  }
};
