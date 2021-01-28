import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase';

Vue.use(Vuex)

export default {
  state: {
    registerCurrentError: "unknown error",
    registerPassed: true,
  },
  mutations: {
    registerSetCurrentError:  (state,payload) => {
      state.registerCurrentError =  payload;     
    },
    registerSetPassed:  (state,payload) => {
      state.registerPassed =  payload;
    },
    registerPressed: (state, payload) => {
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password).then(() => {
      router.replace({name: "secret"})
      })
      .catch(e => {
        state.registerCurrentError = e.message;
        state.registerPassed = false;
      })  
    }
  },
  actions: {
    registerPressed:(state, payload) => {
      state.commit('registerPressed',payload)
    },
    registerSetCurrentError: (state,payload) => {
      state.commit('registerSetCurrentError',payload)
    },
    registerSetPassed: (state,payload) => {
      state.commit('registerSetPassed',payload)
    }
  },
  getters: {
    registerGetCurrentError: state => state.registerCurrentError,
    registerGetPassed: state => state.registerPassed,
  }
};
