var express = require('express');
var app = express();
var fs = require("fs");

app.get('/api/v1/users', function (req, res) {
   fs.readFile( __dirname + "/" + "usersv1.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
app.get('/api/v1/products', function (req, res) {
   fs.readFile( __dirname + "/" + "productsv1.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/api/v2/users', function (req, res) {
   fs.readFile( __dirname + "/" + "usersv2.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.get('/api/v2/products', function (req, res) {
   fs.readFile( __dirname + "/" + "productsv2.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
