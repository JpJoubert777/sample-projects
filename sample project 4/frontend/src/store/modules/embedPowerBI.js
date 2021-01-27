import Vue from 'vue'
import Vuex from 'vuex'
import * as pbi from 'powerbi-client';


Vue.use(Vuex)

export default{
  state: {

  },
  mutations: {
    embedFunction: (state,embedData) => {
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
      //console.log(embedData.expiry)
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
        state.commit('setCurrentError','embed error');
        state.commit('setPassed',false);
        return;
      });
    },
 
  },
  actions: {
      embedFunction: (state,embedData) => {
      state.commit('embedFunction',embedData)  
    }
  },
  modules: {
  },
  getters: {
  }
};
