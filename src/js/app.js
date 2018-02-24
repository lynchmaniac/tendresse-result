"use strict";

require('babel-register');
let threerest = require('threerest');
let path = require('path');
let cors = require('cors');
let request = require('request');
let fs = require('fs');

import * as ServiceTop from "./services/serviceTop";

import express from "express";

var app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname + './')));
app.get("/", function(req, res){
  res.sendFile(path.resolve('./') + '/src/assets/index.html');
});

app.get("/top", function(req, res){
  res.send(ServiceTop.getTop3());
});


// load the service Test
//threerest.ServiceLoader.loadService(app, new ServiceTop.default());


app.listen(8082, () => {
  console.log("Express start...");
  console.log("Les résultats sont consultables à l'adresse :"); 
  console.log('http://localhost:8082/top');
});
