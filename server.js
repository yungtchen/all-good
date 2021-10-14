const fs = require("fs");
const https = require("https");
const express = require("express");
const Tsr = require("tesseract.js");

const key = fs.readFileSync("./config/key.pem");
const cert = fs.readFileSync("./config/cert.pem");


const app = express();

const server = https.createServer({ key: key, cert: cert }, app);
app.use(express.static("public"));

app.post("/scan", (req, res) => {
    const blob = req.body;
    Tsr.recognize(blob, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        res.send(text);
      });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
