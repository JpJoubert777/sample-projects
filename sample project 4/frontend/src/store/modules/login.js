import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import firebase from 'firebase';

Vue.use(Vuex)

export default {
  mutations: {
    async loginPressed(state, {email, password}) {
      try{
        const val = await firebase.auth().signInWithEmailAndPassword(email,password);
        router.replace({name: "secret"});
      }
      catch (e){
        this.setCurrentError(e.message);
        this.setPassed(false);
      }  
    }
  },
  actions: {
    loginPressed(state, {email, password}) {
      state.commit('loginPressed',{email, password})
    }
  }
};
