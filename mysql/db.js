/**
 * Created by zhouqi on 2017/3/28.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 15,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'secondhand'
});

module.exports = pool;