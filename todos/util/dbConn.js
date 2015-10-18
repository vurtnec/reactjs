var db = require('../conf/db');

var conn = require('mysql').createConnection(db.mysqlConf);

module.exports = conn;

