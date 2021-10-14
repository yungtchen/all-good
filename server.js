const fs = require('fs');
const https = require('https');
const express = require( "express" );

const key = fs.readFileSync('./config/key.pem');
const cert = fs.readFileSync('./config/cert.pem');

const app = express();

const server = https.createServer({key: key, cert: cert }, app);
app.use(express.static('public'))

server.listen(3000, () => { console.log('listening on 3000') });
