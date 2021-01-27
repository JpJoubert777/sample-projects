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
      try {
        state.registerCurrentError =  payload; 
      }
      catch (e){
        state.registerCurrentError = e.message;
        state.registerPassed = false;
      }          
    },
    registerSetPassed:  (state,payload) => {
      try {
        state.registerPassed =  payload;
      }
      catch (e){
        state.registerCurrentError = e.message;
        state.registerPassed = false;
      } 
    },
    async registerPressed(state, {email, password}) {
      try {
        const val = await firebase.auth().createUserWithEmailAndPassword(email,password)
        router.replace({name: "secret"})
      }
      catch (e){
        state.registerCurrentError = e.message;
        state.registerPassed = false;
      } 
    }
  },
  actions: {
    registerPressed(state, {email, password}) {
      try {
        state.commit('registerPressed',{email, password})
      }
      catch (e){
        state.commit.SetCurrentError(e.message);
        state.commit.registerSetPassed(false);
      }
    },
    registerSetCurrentError: (state,payload) => {
      try {
        state.commit('registerSetCurrentError',payload)
      }
      catch (e){
        state.commit.SetCurrentError(e.message);
        state.commit.registerSetPassed(false);
      }
    },
    registerSetPassed: (state,payload) => {
      try {
        state.commit('registerSetPassed',payload)
      }
      catch (e){
        state.commit.SetCurrentError(e.message);
        state.commit.registerSetPassed(false);
      }
    }
  },
  getters: {
    registerGetCurrentError: state => state.registerCurrentError,
    registerGetPassed: state => state.registerPassed,
  }
};
