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
        console.log(token)
        return token;
    }
    catch (e){
        console.log(e.message);
    }
}

async function getEmail(id){

    var admin = require("firebase-admin");
    var serviceAccount = require(path.join(__dirname +"/sample-project-4-9e45a-firebase-adminsdk-b7pk7-866f8e2d0d.json"));
    if (admin.apps.length == 0){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    const db = admin.firestore();
    //get from firestore
    const sgMail = require('@sendgrid/mail')
    var API_KEY = "";
    var name = "";
    var major = "";
    var email = "";
    var start_date = "";
    var fromEmail = "";
    var sendGridref = await db.collection('settings').doc('sendGrid')
    .get().then(doc => {
        API_KEY = doc.data().sendGridKey;
        fromEmail = doc.data().sendGridFromEmail;
    })
    .catch(err => {
        console.log('Error getting document', err);
        return false;
    });
    
    const ref = db.collection('emails').doc(id)
    .get().then(doc => {
        name = doc.data().name;
        major = doc.data().major;
        email = doc.data().email;
        start_date = doc.data().start_date;
        
        // console.log("name: ",name);
        // console.log("major: ",major);
        // console.log("email: ",email);
        // console.log("start_date: ",start_date);
        var pdfText = 'We have a candidate named '+ name + ' with a major in ' + major + ' who can start on ' + start_date
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        pathToAttachment = path.join(__dirname +"/attachment.pdf")

        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(pathToAttachment));
        pdfDoc.text(pdfText);
        pdfDoc.end();

        var attachment = fs.readFileSync(pathToAttachment).toString("base64");

        sgMail.setApiKey(API_KEY)
    
        const message = {
            to: email,
            from: fromEmail,
            subject: 'Hello from Jobox',
            text: "Find attached the attachment.pdf",
            attachments: [
                {
                  content: attachment,
                  filename: "attachment.pdf",
                  type: "application/pdf",
                  disposition: "attachment"
                }
              ]
        };
       
        sgMail.send(message)
        .then(response=>console.log('Email sent'))
        .catch(error=>console.log(error.message));
        
        
      
    })

    .catch(err => {
        console.log('Error getting document', err);
        return false;
    });

}
module.exports = {
    getJwt: getJwt,
    getEmail:getEmail
}