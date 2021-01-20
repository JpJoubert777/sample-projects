// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

let path = require('path');
let embedToken = require(__dirname + '/embedConfigService.js');
const utils = require(__dirname + "/utils.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Prepare server for Bootstrap, jQuery and PowerBI files
app.use('/js', express.static('./node_modules/bootstrap/dist/js/')); // Redirect bootstrap JS
app.use('/js', express.static('./node_modules/jquery/dist/')); // Redirect JS jQuery
app.use('/js', express.static('./node_modules/powerbi-client/dist/')) // Redirect JS PowerBI
app.use('/css', express.static('./node_modules/bootstrap/dist/css/')); // Redirect CSS bootstrap
app.use('/public', express.static('./public/')); // Use custom JS and CSS files
app.use(cors({ origin: true }));
const port = process.env.PORT || 5300;


   // PRIVATE key
   var privateKEY  = fs.readFileSync(path.join(__dirname +'/private.key'), 'utf8');
   // SIGNING OPTIONS
   var signOptions = {
    algorithm:  "RS256"
   };

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

app.get('/getEmbedToken', async function (req, res) {

    // Validate whether all the required configurations are provided in config.json
    configCheckResult = utils.validateConfig();
    if (configCheckResult) {
        return {
            "status": 400,
            "error": configCheckResult
        };
    }
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo();


    //encrypt with JWT token
    var token = jwt.sign(result, privateKEY, signOptions);

    // result.status specified the statusCode that will be sent along with the result object
    //res.status(result.status).send(result);

    res.send(token);
});

app.get('/helloWorld', async function (req, res) {
    var token = jwt.sign(payload, privateKEY, signOptions);
    var legit = jwt.verify(token, publicKEY, verifyOptions);
    res.send(legit);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

