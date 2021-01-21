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
        console.log(configCheckResult)
        return {
            "status": 400,
            "error": configCheckResult
        };
    }
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo();

    //init connection to database containing jwt key
    var admin = require("firebase-admin");
    var serviceAccount = require(path.join(__dirname +"/sample-project-4-9e45a-firebase-adminsdk-b7pk7-866f8e2d0d.json"));
    if (admin.apps.length == 0){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
        
    const db = admin.firestore();
    
    //get key from firestore
    var KEY = "";
    const ref = await db.collection('settings').doc('backend')
    .get().then(doc => {
        KEY = doc.data().key;
    })
    .catch(err => {
        console.log('Error getting document', err);
        return false;
    });
    
    // SIGNING OPTIONS
    var signOptions = {
        algorithm:  "HS256"
    };

    //only kept in case you want to see the problems that occur with the other encryption algorithms
    //KEY  = fs.readFileSync(path.join(__dirname +'/private.key'), 'utf8');
    
    //encrypt with JWT token
    try{
        var token = jwt.sign(result, KEY, signOptions);
    }
    catch (e){
        console.log(e);
    }
    
    res.send(token);
});

app.get('/helloWorld', async function (req, res) {
    res.send("helloWorld");
 
});

app.listen(port, () => console.log(`Listening on port ${port}`));

