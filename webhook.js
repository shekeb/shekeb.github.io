---
layout: page
title: webhook
permalink: /webhook
---



Thanks for visiting the webhook page!
<br>
<a href="http://www.economist.com/printedition/">The Economist</a>
<br>
<a href="http://international.nytimes.com">The New York Times</a>
<br>
<a href="http://npr.org">NPR</a>
<br>
<a href="http://www.ncbi.nlm.nih.gov/pubmed/">PubMed</a>


<!-- webhook for Facebook Messenger Platform -->
<script>
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var pagetoken = "CAAK7C6Mqtm0BAAgAyvSZB4OZAaMm2rsGe7OusmS6hwnWQZCKWcWzirdbRpgE3zKcAkoctb0G6zHeWrZB4uuf1fga4CABsA8qOzxW6t3TIrRl7RlBZA1imcJoafaYKMee8nl0DBHfdtJ8dyWL9LJ5kxNsZBAS0VYGrk4LVCbZAYmL16bC4lMHbfQZBrVk0O1om4gZD";
var webhooktoken = "WT9yaqVnjTq2NHDxxxU8GmUn0SQ44OeMcWdE1";

app.use(bodyParser.json())  // will auto parse JSON. from github.com/expressjs/body-parser

// Test
app.get('/hello', function(req, res) {
  res.send('world');
});

// To verify
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === webhooktoken) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});


function sendTextMessage(sender, text) {
  console.log('we are in sendToMessage');
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:pagetoken},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}


// Should do the things we want to do
app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
      sendTextMessage(sender, "Text received was: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});


app.listen(process.env.PORT);

</script>
<!-- webhook for Facebook Messenger Platform -->
