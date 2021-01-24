
<template>
    <div class = "modal-overlay" v-if="!passed" >
        <p>{{errorMessage}}</p>
    </div>
    <div v-else>
        <section id="report-container" class="embed-container" >
        </section>
    </div>
</template>


<script>
import * as pbi from 'powerbi-client';
import axios from "axios";
import firebase from 'firebase';
const jwt = require('jsonwebtoken');
export default {
    name:'secret', 
    data() {
        return { 
            passed : true,
            errorMessage : "error"
        }
    },
    methods: {
    },
    mounted(){
        if (this.passed) {
                    let models = pbi.models;
        
            let reportContainer = $("#report-container").get(0);

            // Initialize iframe for embedding report
            powerbi.bootstrap(reportContainer, { type: "report" });

            let path = require('path');
    
            //init connection to database containing jwt key
            const db = firebase.firestore(); //>>>>>>>>>>>call from a different file that exports this (import db from blah.js)
            
            //get key from firestore
            var KEY = "";
            getKEY();
            
            // VERIFYING OPTIONS
            var verifyOptions = {
                expiresIn:  "1h",
                algorithm:  ["HS256"]
            };
            
            axios.get(`http://localhost:5300/getEmbedToken`)
            .then(response => {
                
                
                try{
                    //get the JWT token and decrypt it to get the PowerBI toke
                    var legit = jwt.verify(response.data, "-----BEGIN EC PRIVATE KEY----- MHcCAQEEIHJQrhJW/b7X/gRL2vQC/3VbG3iDr4yfUJy32SVfh50WoAoGCCqGSM49 AwEHoUQDQgAEexjFw4rZCMVzq8UP7hMKipp+uz6NkZa2tE1md23JlatQQY3v0ETW VWXr3JTI/qv4bzabyjfXl8+70vIeEO/QXg== -----END EC PRIVATE KEY-----", verifyOptions);
                    //embed the report
                
                    embedFunction(legit)
                    
                }
                catch (e){
                    this.passed = false;
                    this.errorMessage = e.message;
                    console.log(e); //add modal
                }
    
            })
            .catch(e => {
                this.passed = false;
                this.errorMessage = e.message;
                console.log("catch") //add modal
                console.log(e.message)
            })

            function getKEY(){
                db.collection('settings').doc('backend')
                .get()
                .then(doc => {
                    var thisKEY = doc.data().key;
                    KEY = thisKEY;
                })
                .catch(err => {
                    this.passed = false;
                    this.errorMessage = e.message;
                    console.log('Error getting document', err);
                });
            }
            
            function embedFunction(embedData) {
                    
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
                        this.passed = false;
                        let errorMsg = event.detail;
                        this.errorMessage = errorMsg;
                        console.error(errorMsg);
                        console.log(errorMsg);
                        return;
                    });
            }
        }

       
    }
}
</script>
<style lang="scss">
#report-container {
    height: calc(0.5625 * 61vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 575px) {
    #report-container {
        height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
    }
}
.backdrop{
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
.modal-overlay {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
</style>

