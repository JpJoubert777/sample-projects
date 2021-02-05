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
          //---------------------------> For deployment and scalability, look into distributed counters <---------------------------
          //future research: https://firebase.google.com/docs/firestore/solutions/counters#node.js
            const db = firebase.firestore(); 
            const increment = firebase.firestore.FieldValue.increment(1);
            var id = 0;
            const totalEmailsRef = db.collection('emails').doc('invoiceCount')
            .get().then(doc => {
              id = doc.data().count;
              console.log("inner id:" + id);

              const statsRef = db.collection('emails').doc('invoiceCount')
              const emailsRef =  db.collection('emails').doc(id.toString());

              const batch = db.batch();
      
              batch.set(emailsRef, {
                name: payload.name,
                major: payload.major,
                email: payload.email,
                start_date: payload.start_date,
                receiptURL: ""
              });

              batch.set(statsRef, {count: increment}, {merge: true});
              
              batch.commit().then(newdoc => {
                console.log("email created with ID: ", id);
                api.sendEmail(id);  
              });
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
