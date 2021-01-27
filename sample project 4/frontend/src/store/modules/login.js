import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase';

Vue.use(Vuex)

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    async loginPressed(state, {email, password}) {
        const val = await firebase.auth().signInWithEmailAndPassword(email,password)
        router.replace({name: "secret"})
    }
  },
  modules: {
  },
  getters: {
  }
};
