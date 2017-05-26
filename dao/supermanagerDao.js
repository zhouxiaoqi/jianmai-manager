var pool = require('../mysql/db');
var sql = require('../mysql/sql');

module.exports = {

    // 新增管理员
    addManager: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.SuperManagerSql.addManager,
                [req.body.admin_username, req.body.admin_password, req.body.admin_nickname, req.body.admin_level], function (err, result) {
                    if (err) throw err;
                    return callback(result.affectedRows);
                });
            connection.release();
        })
    },

    // 验证管理员用户名
    validate: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.SuperManagerSql.validate, [req.body.admin_username], function (err, admin) {
                return callback(admin);
            });
            connection.release();
        })
    },

    //取出所有普通管理员列表
    getAllNormalAdmin: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.SuperManagerSql.getNormalAdmin, function (err, admins) {
                if(err) throw err;
                return callback(admins);
            });
            connection.release();
        })
    }
}