"use strict";

require('babel-register');
//let threerest = require('threerest');
let path = require('path');
let cors = require('cors');
let request = require('request');
let fs = require('fs');

import * as ServiceTop from "./services/serviceTop";

import express from "express";

const fileUpload = require('express-fileupload');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

var app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(express.static(path.join(__dirname + './')));
app.get("/", function(req, res){
  console.log("slhvsldvhlsdvhj")
 // res.sendFile(path.resolve('./') + '/public/assets/index.old.html');
});

app.get("/top", function(req, res){
  res.send(ServiceTop.getTop3());
});

app.post('/file-upload', function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  fs.writeFileSync('results/' + req.files.fileUpload.name, req.files.fileUpload.data)
  res.send('File uploaded!');
});

app.get('/downloads/:filename', function(req, res, next) {

  var filename = req.params.filename;
  res.sendFile('results/' + filename, { root: '.' })
});


// load the service Test
//threerest.ServiceLoader.loadService(app, new ServiceTop.default());


app.listen(8082, () => {
  console.log("Express start...");
  console.log("Les résultats sont consultables à l'adresse :"); 
  console.log('http://localhost:8082/top');
});
