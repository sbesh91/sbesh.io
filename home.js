/*jslint node: true */
"use strict";
var redis = require("redis"),
  client = redis.createClient(),
  express = require('express'),
  app = express(),
  handlebars = require("express-handlebars"),
  path = require("path");

  client.set("string key", "redis working", redis.print);

app.use('/static', express.static(path.join(__dirname, "/styles")));
app.use('/static', express.static(path.join(__dirname, "/scripts")));
app.use('/static', express.static(path.join(__dirname, "/node_modules/vue/dist")));
app.use('/static', express.static(path.join(__dirname, "/node_modules/web-animations-js")));

app.set('views', path.join(__dirname, "views"));
app.engine("handlebars", handlebars({defaultLayout: path.join(__dirname, "_layout")}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  client.get("string key",function(err, value){
    if (err) {
      res.send(err);
    } else {
      res.render("index",{data: value});
    }
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
