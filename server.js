var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/quacker_development', { native_parser: true })
db.bind('quacks');

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname));
app.use(function(req, res, next){
  req.db = db;
  next();
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/quacks', parseUrlencoded, function(req, res){
  var db = req.db;
  db.quacks.find().sort({date: -1}).toArray(function(err, items){
    res.json(items);
  });
});

app.post('/quacks', parseUrlencoded, function(req, res){
  var db = req.db;
  db.quacks.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err });
  });
});

app.get('/quacks', function(req, res){
  res.render('quacks', { quack: req.quack })
});

app.listen(8080, function(){
  console.log("Quacking on port 8080")
});;

module.exports = app;