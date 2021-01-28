import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import api from '../api/api';
import * as pbi from 'powerbi-client';


const jwt = require('jsonwebtoken');
Vue.use(Vuex)

export default{
  state: {
    api: null,
    jwtKey: "",
    verifyOptions: {
      expiresIn:  "1h",
      algorithm:  ["HS256"]
    },
    networkCurrentError: "unknown error",
    networkPassed: true,
  },
  mutations: {
    networkSetCurrentError:  (state,payload) => {
      state.networkCurrentError =  payload;          
    },
    networkSetPassed:  (state,payload) => {
      state.networkPassed =  payload;
    },
    embeddedPowerBi: async (state)  => {
      try {
        //get JWT key from firestore
        const db = firebase.firestore(); 
        db.collection('settings').doc('backend')
        .get()
        .then(doc => { 
          state.jwtKey = doc.data().key;
        })
        .catch(err => {
          state.networkCurrentError =  err.message; 
          state.networkPassed =  false;   
        });  
        //get the JWT token and decrypt it to get the PowerBI token
        var response = await api.embeddedToken();
        var embedData = await jwt.verify(response.data,state.jwtKey, state.verifyOptions);

        let models = pbi.models;
        
        let reportContainer = document.getElementById('report-container');

        // Initialize iframe for embedding report
        powerbi.bootstrap(reportContainer, { type: "report" });
        
        // Create a config object with type of the object, Embed details and Token Type
        let reportLoadConfig = {
          type: "report",
          tokenType: models.TokenType.Embed,
          accessToken: embedData.accessToken,

          // Use other embed report config based on the requirement. We have used the first one for demo purpose
          embedUrl: embedData.embedUrl[0].embedUrl,

        };
        // Use the token expiry to regenerate Embed token for seamless end user experience
        // Refer https://aka.ms/RefreshEmbedToken
        //tokenExpiry = embedData.expiry;

        // Embed Power BI report when Access token and Embed URL are available
        let report = powerbi.embed(reportContainer, reportLoadConfig);
        // Clear any other loaded handler events
        report.off("loaded");
        // Triggers when a report schema is successfully loaded
        report.on("loaded", function () {
            console.log("Report load successful");
        });
        // Clear any other rendered handler events
        report.off("rendered");
        // Triggers when a report is successfully embedded in UI
        report.on("rendered", function () {
            console.log("Report render successful");
        });
        // Clear any other error handler events
        report.off("error");
      }
      catch (e){
        state.networkCurrentError =  e.message; 
        state.networkPassed =  false;    
      }
    }
  },
  actions: {
    networkSetCurrentError: (state,payload) => {
      state.commit('networkSetCurrentError',payload)
    },
    networkSetPassed: (state,payload) => {
      state.commit('networkSetPassed',payload)
    },
    getPowerBiReports: (state) => {
        state.commit('embeddedPowerBi');
    },
    networkErrorReset(state, payload) {
      state.commit('networkSetCurrentError',"unknown error")
      state.commit('networkSetPassed',true)
    }
  },
  getters: {
    getJwtKey: state => state.jwtKey,
    getVerifyOptions: state => state.verifyOptions,
    networkGetCurrentError: state => state.networkCurrentError,
    networkGetPassed: state => state.networkPassed
  }
};
