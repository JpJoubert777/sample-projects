import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import axios from "axios";
const jwt = require('jsonwebtoken');
Vue.use(Vuex)

export default{
  state: {
    api: null,
    jwtKey: "",
    verifyOptions: {
      expiresIn:  "1h",
      algorithm:  ["HS256"]
    }
  },
  mutations: {
  },
  actions: {
    async getResponse(state) {
      //get JWT key from firestore
      const db = firebase.firestore(); 
      db.collection('settings').doc('backend')
      .get()
      .then(doc => { 
        state.jwtKey = doc.data().key;
      })
      .catch(err => {
        state.commit('setCurrentError',err.message);
        state.commit('setPassed',false);
      });

      state.api = axios.create();
      var response = await state.api.get("http://localhost:5300/getEmbedToken");
      try{
        //get the JWT token and decrypt it to get the PowerBI token
        var legit = jwt.verify(response.data,state.jwtKey, state.verifyOptions);
        state.commit('embedFunction',legit);
      }
      catch (e){
        state.commit('setCurrentError',e.message);
        state.commit('setPassed',false);
      }
    }
  },
  modules: {
  },
  getters: {
    getJwtKey: state => state.jwtKey,
    getVerifyOptions: state => state.verifyOptions
  }
};
