
<template>
    <div class="container">
        <section id="report-container" class="embed-container" >
        </section>
        <section class="error-container m-5">
        </section>
        <!-- <iframe 
            width="1920" 
            height="1080" 
            src="https://cryptic-thicket-39928.herokuapp.com/" 
            frameborder="0" allowFullScreen="true">
        </iframe> -->
    </div>
</template>


<script>
import * as pbi from 'powerbi-client';
import axios from "axios";

const jwt = require('jsonwebtoken');
export default {
    name:'secret', 
    methods: {
    },
    mounted(){
        // ----------------------------------------------------------------------------
        // Copyright (c) Microsoft Corporation.
        // Licensed under the MIT license.
        // ----------------------------------------------------------------------------
        let models = pbi.models;
       // let models = window["powerbi-client"].models;
        let reportContainer = $("#report-container").get(0);

        // Initialize iframe for embedding report
        powerbi.bootstrap(reportContainer, { type: "report" });

        let path = require('path');
        //PUBLIC key
        var publicKEY  = "-----BEGIN PUBLIC KEY-----MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAX712K1LnGs59HzeaiQesVwccb6bA4P0TUE0q5uHKUH9AZb7vwhJE+7BmlViFGQie6aPjWimmXpnnzJ0u8Sua7wIDAQAB-----END PUBLIC KEY-----"

        // VERIFYING OPTIONS
        var verifyOptions = {
            algorithm:  ["RS256"]
        };
        
        axios.get(`https://cryptic-thicket-39928.herokuapp.com/getEmbedToken`)
        .then(response => {
            //get the JWT token and decrypt it to get the PowerBI token
            var legit = jwt.verify(response.data, publicKEY, verifyOptions);

            //embed the report
            embedFunction(legit)
             
        })
        .catch(e => {
            console.log(e.message)
        })
        function embedFunction(embedData) {
                
                // Create a config object with type of the object, Embed details and Token Type
                let reportLoadConfig = {
                    type: "report",
                    tokenType: models.TokenType.Embed,
                    accessToken: embedData.accessToken,

                    // Use other embed report config based on the requirement. We have used the first one for demo purpose
                    embedUrl: embedData.embedUrl[0].embedUrl,

                    // Enable this setting to remove gray shoulders from embedded report
                    // settings: {
                    //     background: models.BackgroundType.Transparent
                    // }
                };
                console.log(embedData.expiry)
                // Use the token expiry to regenerate Embed token for seamless end user experience
                // Refer https://aka.ms/RefreshEmbedToken
               // tokenExpiry = embedData.expiry;

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
                    let errorMsg = event.detail;
                    console.error(errorMsg);
                    return;
                });
            
        }

        function handleErrors(err) {
            // Show error container
            let errorContainer = $(".error-container");
            $(".embed-container").hide();
            errorContainer.show();

            // Get the error message from err object
            let errMsg = JSON.parse(err.responseText)['error'];

            // Split the message with \r\n delimiter to get the errors from the error message
            let errorLines = errMsg.split("\r\n");

            // Create error header
            let errHeader = document.createElement("p");
            let strong = document.createElement("strong");
            let node = document.createTextNode("Error Details:");

            // Get the error container
            let errContainer = errorContainer.get(0);

            // Add the error header in the container
            strong.appendChild(node);
            errHeader.appendChild(strong);
            errContainer.appendChild(errHeader);

            // Create <p> as per the length of the array and append them to the container
            errorLines.forEach(element => {
                let errorContent = document.createElement("p");
                let node = document.createTextNode(element);
                errorContent.appendChild(node);
                errContainer.appendChild(errorContent);
            });
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
</style>