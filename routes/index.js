var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.get('/quacks', function(req, res){
  var db = req.db;
  db.quacks.find().sort({date: -1}).toArray(function(err, items){
    res.json(items);
  });
}).post('/quacks', function(req, res){
  var db = req.db;
  db.quacks.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err });
  });
}).delete('/quacks/:id', function(req, res){
  var db = req.db;
  var quackToDelete = req.params.id;
  db.quacks.removeById(quackToDelete, function(err, result){
    res.send((result === 1) ? { msg: '' } : { msg : err });
  });
});

module.exports = router;