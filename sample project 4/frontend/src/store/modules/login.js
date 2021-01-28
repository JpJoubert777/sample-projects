import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase';

Vue.use(Vuex)

export default {
  state: {
    loginCurrentError: "unknown error",
    loginPassed: true,
  },
  mutations: {
    loginSetCurrentError:  (state,payload) => {
      state.loginCurrentError =  payload;         
    },
    loginSetPassed:  (state,payload) => {
      state.loginPassed =  payload;
    },
    async loginPressed(state, payload) {
      const val = await firebase.auth().signInWithEmailAndPassword(payload.email,payload.password).then(() => {
        router.replace({name: "secret"});
      })
      .catch(e => {
        state.loginCurrentError = e.message;
        state.loginPassed = false;
      })
    }
  },
  actions: {
    loginPressed(state, payload) {
        state.commit('loginPressed',payload)
    },
    loginSetCurrentError: (state,payload) => {
        state.commit('loginSetCurrentError',payload)
    },
    setPassed: (state,payload) => {
        state.commit('loginSetPassed',payload)
    }
  },
  getters: {
    loginGetCurrentError: state => state.loginCurrentError,
    loginGetPassed: state => state.loginPassed,
  }
  
};
