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
    async registerPressed(state, {email, password}) {
        const val = await firebase.auth().createUserWithEmailAndPassword(email,password)
        router.replace({name: "secret"})
    }
  },
  modules: {
  },
  getters: {
  }
};
