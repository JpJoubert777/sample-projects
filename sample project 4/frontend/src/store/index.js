import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import * as pbi from 'powerbi-client';
const jwt = require('jsonwebtoken');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentError: "unknown error",
    passed: true,
    jwtKey: "",
    verifyOptions: {
      expiresIn:  "1h",
      algorithm:  ["HS256"]
    }
  },
  mutations: {
    setCurrentError: (state,payload) => {
      state.currentError = payload;
    },
    setPassed: (state,payload) => {
      state.passed = payload;
    },
    setJwtKey: (state) => {
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
    },
    embedFunction: (state,embedData) => {
      let models = pbi.models;
      let reportContainer = $("#report-container").get(0);

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
      console.log(embedData.expiry)
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

      // Handle embed errors
      report.on("error", function (event) {
          state.commit('setCurrentError',e.message);
          state.commit('setPassed',false);
          this.errorMessage = state.getters.getCurrentError;
          return;
      });
    },
    // embedReport: (state) => {
    //     if (state.passed) {
    //       //get JWT key from firestore
    //       state.commit('setJwtKey');

    //       axios.get(`http://localhost:5300/getEmbedToken`)
    //       .then(response => {
    //           try{
    //               //get the JWT token and decrypt it to get the PowerBI token
    //               var key = state.jwtKey;
    //               var verifyOptions = state.verifyOptions;
    //               var legit = jwt.verify(response.data,key, verifyOptions);
    //               //embed the report
    //               state.commit('embedFunction',legit);
    //           }
    //           catch (e){
    //             state.commit('setCurrentError',e.message);
    //             state.commit('setPassed',false);
    //               this.errorMessage = this.$store.getters.getCurrentError;
    //           }
    //       })
    //       .catch(e => {
    //         state.commit('setCurrentError',e.message);
    //         state.commit('setPassed',false);
    //           this.errorMessage = this.$store.getters.getCurrentError;
    //       })
    //   }
    // }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCurrentError: state => state.currentError,
    getPassed: state => state.passed,
    getJwtKey: state => state.jwtKey,
    getVerifyOptions: state => state.verifyOptions
  }
});
