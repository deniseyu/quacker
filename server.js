var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var routes = require('./routes/index');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/quacker_development', { native_parser: true });
db.bind('quacks');

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next){
  req.db = db;
  next();
});

app.use('/', routes);

app.listen(8080, function(){
  console.log("Quacking on port 8080")
});;

module.exports = app;