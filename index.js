require('dotenv').config()
const http = require('http');
const bodyParser = require('body-parser')
const express = require('express');
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/sms', (req, res) => {
  if (req.body.number && req.body.initiateOrder === true) {
    const message = `Your friendly Dominos 🍕🤖 here to relieve you of your hunger ⚔️\nCan I have your first name and last name?`
    sendText(message, req.body.number)
  }

  // 1. Get User's first name and last name and store it.
  // 2. Get User's address
  // 3. Get User's order
  // 4. Ask if they want delivery or carryout
  // 5. Verify all details?
  // 6. Confirm that store received order and give delivery estimate

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end('<Response/>');
});

http.createServer(app).listen(1337, () => {
  console.log('Pizzilio server listening on port 1337 🍕\nReady to help humans order pizza 😎');
});

function sendText(message, number) {
  client.messages
    .create({
      to: number,
      from: process.env.TWILIO_NUMBER,
      body: message
    })
    .then(message => console.log(message.sid))
}