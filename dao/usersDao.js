/**
 * Created by zhouqi on 2017/3/28.
 */
var pool = require('../mysql/db');
var sql = require('../mysql/sql');

module.exports = {

    /**
     * 获取所有users
     * @param req
     * @param res
     * @param callback
     */
    get_AllUsers: function (req, res, callback) {
        // 从连接池获取连接
        pool.getConnection(function (err, connection) {
            connection.query(sql.UserSql.getAllUsers, function (err, users) {
                if (err)
                    return console.log(err);
                return callback(users);
            });
            connection.release();
        })
    },

    /**
     * 使用户进入黑名单
     * @param req
     * @param res
     * @param callback
     */
    insert_blacklist: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.UserSql.insertBlackList, [req.body.a_id, req.body.content], function (err, result) {
                if (err) return console.log(err);
                //取得受影响的行数
                return callback(result.affectedRows);
            });
            connection.release();
        })
    },

    /**
     * 根据账户搜索用户
     * @param req
     * @param res
     * @param callback
     */
    search_User:function (req,res,callback) {
        pool.getConnection(function (err,connection) {
            connection.query(sql.UserSql.searchUserByEmail,[req.body.q],function (err,user) {
                if(err) throw err;
                return callback(user);
            });
            connection.release();
        })
    }
}