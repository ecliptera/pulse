const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const privateKey = fs.readFileSync('./resources/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./resources/localhost.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

app.use(express.static('public'));

app.get('/firebase-config.json', (req, res) => {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    }

    res.setHeader("Content-Type", "application/json");
    res.send(firebaseConfig);
});

const port = 8443;
https.createServer(credentials, app).listen(port, () => {
    console.log(`HTTPS server running on https://localhost:${port}`);
});
