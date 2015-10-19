var db = require('../conf/db');

var mysql = require('mysql');

var pool  = mysql.createPool(db.mysqlConf);

module.exports = pool;

