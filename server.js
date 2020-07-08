"use strict";
var express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  app = express(),
  messages = JSON.parse(fs.readFileSync('data/messages.json', 'utf-8')),
  inContainer = process.env.CONTAINER,
  inAzure = process.env.WEBSITE_RESOURCE_GROUP,
  port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

//The dist folder has our static resources (index.html, css, images)
if (!inContainer) {
  app.use(express.static(__dirname + '/dist'));
  console.log(__dirname);
}

app.get('/api/messages/page/:skip/:top', (req, res) => {
  const topVal = req.params.top,
    skipVal = req.params.skip,
    skip = (isNaN(skipVal)) ? 0 : +skipVal;
  let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

  if (top > messages.length) {
    top = skip + (messages.length - skip);
  }

  console.log(`Skip: ${skip} Top: ${top}`);

  var pagedMessages = messages.slice(skip, top);
  res.setHeader('X-InlineCount', messages.length);
  res.json(pagedMessages);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

if (!inContainer) {
  // redirect all others to the index (HTML5 history)
  app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/chat-room/index.html');
  });
}

app.listen(port);
