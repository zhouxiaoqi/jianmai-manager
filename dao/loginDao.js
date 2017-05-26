var pool = require('../mysql/db');
var sql = require('../mysql/sql');

module.exports = {
    /**
     *  管理员登录
     *  @param req
     *  @param callback 
     */
    adminLogin: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.LoginSql.adminLogin, [req.body.username, req.body.password], function (err, admin) {
                if (err) throw err;
                return callback(admin);
            });
            connection.release();
        })
    },
}