import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
    },
    async signOutPressed(state) { 
      const data = await firebase.auth().signOut().then(() => {
        router.replace({name:"login"})

      })
    }
  },
  actions: {
    loginPressed(state, payload) {
        state.commit('loginPressed',payload)
    },
    signOutPressed(state, payload) {
      state.commit('signOutPressed')
    },
    loginErrorReset(state, payload) {
      state.commit('loginSetCurrentError',"unknown error")
      state.commit('loginSetPassed',true)
    }
  },
  getters: {
    loginGetCurrentError: state => state.loginCurrentError,
    loginGetPassed: state => state.loginPassed,
    loginCompleted: state => state.loginCompleted
  }
  
};
