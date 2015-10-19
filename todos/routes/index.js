var express = require('express');
var pool = require('../util/dbPool');
var sql = require('../dao/todosSqlMapping');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile(path.join(__dirname, '../views/index.html'));

  //res.render('index', { title: 'Express' });
});


router.get('/queryAll', function(req, res, next) {
  //connection.connect();

  pool.getConnection(function(err, connection) {
    connection.query(sql.queryAll, function(err, results, fields){
      res.send(results);
      connection.release();
    });
  });

  //connection.end();

});

module.exports = router;
