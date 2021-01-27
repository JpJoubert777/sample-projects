const jwt = require('jsonwebtoken');
let path = require('path');


async function getJwt(result){
    // SIGNING OPTIONS
    var signOptions = {
        algorithm:  "HS256",
        expiresIn:  "30s",
    };

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

    //encrypt with JWT token
    try{
        var token = jwt.sign(result, KEY, signOptions);
        return token;
    }
    catch (e){
        console.log(e.message);
    }
}
module.exports = {
    getJwt: getJwt
}