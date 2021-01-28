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
      try {
        state.loginCurrentError =  payload;   
      }
      catch (e){
        state.loginCurrentError = e.message;
        state.loginPassed = false;
      }         
    },
    loginSetPassed:  (state,payload) => {
      try {
        state.loginPassed =  payload;
      }
      catch (e){
        state.loginCurrentError = e.message;
        state.loginPassed = false;
      } 
    },
    async loginPressed(state, {email, password}) {
      try {
        const val = await firebase.auth().signInWithEmailAndPassword(email,password);
        router.replace({name: "secret"});
      }
      catch (e){
        state.loginCurrentError = e.message;
        state.loginPassed = false;
      } 

    }
  },
  actions: {
    loginPressed(state, {email, password}) {
        state.commit('loginPressed',{email, password})
    },
    loginSetCurrentError: (state,payload) => {
        state.commit('loginSetCurrentError',payload)
    },
    setPassed: (state,payload) => {
        state.commit('loginSetPassed',payload)
  },
  getters: {
    loginGetCurrentError: state => state.loginCurrentError,
    loginGetPassed: state => state.loginPassed,
  }
  
};
