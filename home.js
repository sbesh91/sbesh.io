/*jslint node: true */
"use strict";
var
  fs = require('fs'),
  express = require('express'),
  path = require("path"),
  app = express();

var srcPath = path.join(__dirname, "/build/unbundled/");
var directories = fs.readdirSync(srcPath).filter(function(file){
  return fs.statSync(path.join(srcPath, file)).isDirectory();
});

app.use('/', express.static(srcPath));
for(var i of directories){
  app.use('/', express.static(path.join(srcPath, i)));
}

app.get('/*', function (req, res) {
  res.sendFile(srcPath + 'index.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
