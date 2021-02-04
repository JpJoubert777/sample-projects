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
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "sample-project-4-9e45a.appspot.com"
        });
    }
    //get from firestore
    var API_KEY = "";
    var name = "";
    var major = "";
    var email = "";
    var start_date = "";
    var fromEmail = "";
    const db = admin.firestore();
    var sendGridref = db.collection('settings').doc('sendGrid')
    .get().then(doc => {
        API_KEY = doc.data().sendGridKey;
        fromEmail = doc.data().sendGridFromEmail;
        // console.log("API_KEY: ",API_KEY);
        console.log("fromEmail: ",fromEmail);
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
        
        //Generate pdf
        var pdfText = 'We have a candidate named '+ name + ' with a major in ' + major + ' who can start on ' + start_date + ". Invoice ID:" + id;
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        pathToAttachment = path.join(__dirname +"/" + id + ".pdf");
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(pathToAttachment));
        pdfDoc.text(pdfText);
        pdfDoc.end();

        //upload pdf
        const bucket = admin.storage().bucket();
        const file = bucket.file(id + ".pdf");
        var URL = ""
        bucket.upload(pathToAttachment,{public: true}).then(thisFile=>{
     
            URL = thisFile["0"].metadata.mediaLink;
            //delete from fs
            fs.unlinkSync(pathToAttachment);


            const options = {
                // The path to which the file should be downloaded, e.g. "./file.txt"
                destination: pathToAttachment,
            };

            //download pdf from firestore
            var attachment = null;
            bucket.file(id + ".pdf").download(options).then(thisResponse => {
                //email the attachment
                attachment = fs.readFileSync(pathToAttachment).toString("base64");
                const sgMail = require('@sendgrid/mail')
                sgMail.setApiKey(API_KEY)
                const message = {
                    to: email,
                    from: fromEmail,
                    subject: 'Hello from Jobox',
                    text: "Find attached the attachment.pdf",
                    attachments: [
                        {
                        content: attachment,
                        filename: id + ".pdf",
                        type: "application/pdf",
                        disposition: "attachment"
                        }
                    ]
                };
                sgMail.send(message)
                .then(response=>{
                    console.log('Email sent with URL: ' + URL)
                    const newRef = db.collection('emails').doc(id);
                    const result = newRef.update({receiptURL:URL});
                })
                .catch(error=>console.log(error.message));
                console.log("name: ",name);
                console.log("major: ",major);
                console.log("email: ",email);
                console.log("start_date: ",start_date);
                
                //delete downloaded attachment
                fs.unlinkSync(pathToAttachment);

                
            });
        });
        
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