import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import api from '../api/api';
Vue.use(Vuex)

export default {
  state: {
    emailCurrentError: "unknown error",
    emailPassed: true,
    response: ""
  },

  mutations: {
    sendPressed: async (state,payload) => {
        try{
            const db = firebase.firestore(); 
            var emailsRef =  db.collection('emails');
            emailsRef.add({
                name: payload.name,
                major: payload.major,
                email: payload.email,
                start_date: payload.start_date
            }).then(async function(docRef) {
                console.log("email created with ID: ", docRef.id);
                api.sendEmail(docRef.id);
            }).catch(function(error) {
                state.emailCurrentError = e.message;
                state.emailPassed = false
            });
           
            
        }
        catch(e){
            state.emailCurrentError = e.message;
            state.emailPassed = false
        }
    },
    emailSetCurrentError:  (state,payload) => {
    state.emailCurrentError =  payload;         
    },
    emailSetPassed:  (state,payload) => {
    state.emailPassed =  payload;
    },
    
  },
  actions: {
    sendPressed: (state,payload) => {
        state.commit('sendPressed',payload);
      },
    emailErrorReset(state, payload) {
        state.commit('emailSetCurrentError',"unknown error")
        state.commit('emailSetPassed',true)
      }
  },
  getters: {
    emailGetCurrentError: state => state.emailCurrentError,
    emailGetPassed: state => state.emailPassed,
    emailGetResponse: state => state.response
  }
  
};
