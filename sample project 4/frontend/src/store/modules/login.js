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
      try {
        state.commit('loginPressed',{email, password})
      }
      catch (e){
        state.commit.loginSetCurrentError(e.message);
        state.commit.loginSetPassed(false);
      } 
    },
    loginSetCurrentError: (state,payload) => {
      try {
        state.commit('loginSetCurrentError',payload)
      }
      catch (e){
        state.commit.loginSetCurrentError(e.message);
        state.commit.loginSetPassed(false);
      }
    },
    setPassed: (state,payload) => {
      try {
        state.commit('loginSetPassed',payload)
      }
      catch (e){
        state.commit.loginSetCurrentError(e.message);
        state.commit.loginSetPassed(false);
      }
    }
  },
  getters: {
    loginGetCurrentError: state => state.loginCurrentError,
    loginGetPassed: state => state.loginPassed,
  }
  
};
