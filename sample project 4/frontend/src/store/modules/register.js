import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase';

Vue.use(Vuex)

export default {
  state: {
  },
  mutations: {
    async registerPressed(state, {email, password}) {
      try {
        const val = await firebase.auth().createUserWithEmailAndPassword(email,password)
        router.replace({name: "secret"})
      }
      catch (e){
        this.setCurrentError(e.message);
        this.setPassed(false);
      } 
    }
  },
  actions: {
    registerPressed(state, {email, password}) {
      state.commit('registerPressed',{email, password})
    }
  },
  modules: {
  },
  getters: {
  }
};
