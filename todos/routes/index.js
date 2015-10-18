var express = require('express');
var connection = require('../util/dbConn');
var sql = require('../dao/todosSqlMapping');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile(path.join(__dirname, '../views/index.html'));

  //connection.connect();

//  connection.query(sql.queryAll, function(err, rows, fields){
//    res.send(rows);
//  });

//  connection.end();

  //res.render('index', { title: 'Express' });
});


router.get('/queryAll', function(req, res, next) {
  connection.connect();

  connection.query(sql.queryAll, function(err, results, fields){
    res.send(results);
  });

  connection.end();
});

module.exports = router;
