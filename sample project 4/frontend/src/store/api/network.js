import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import api from './api';
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
      try{
        //get the JWT token and decrypt it to get the PowerBI token
        var response = await api.embeddedToken();
        var legit = jwt.verify(response.data,state.jwtKey, state.verifyOptions);
        state.commit('embedFunction',legit);
        await api.helloWorld().then((temp) => {
          console.log(temp.data);
        });
      }
      catch (e){
        state.commit('setCurrentError',e.message);
        state.commit('setPassed',false);
      }
    }
  },
  actions: {
    
      async getResponse(state) {  
      //state.commit('getResponse')  
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
      try{
        //get the JWT token and decrypt it to get the PowerBI token
        var response = await api.embeddedToken();
        var legit = jwt.verify(response.data,state.jwtKey, state.verifyOptions);
        state.commit('embedFunction',legit);
        await api.helloWorld().then((temp) => {
          console.log(temp.data);
        });
      }
      catch (e){
        state.commit('setCurrentError',e.message);
        state.commit('setPassed',false);
      }
    }
  },
  getters: {
    getJwtKey: state => state.jwtKey,
    getVerifyOptions: state => state.verifyOptions
  }
};
