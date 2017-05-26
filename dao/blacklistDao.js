/**
 * Created by zhouqi on 2017/3/29.
 */
var pool = require('../mysql/db');
var sql = require('../mysql/sql');


module.exports = {

    /**
     * 获取所有user信息
     * @param req
     * @param res
     * @param callback
     */
    get_AllBlackList: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.BlackListSql.getAllBlacklist, function (err, blacklists) {
                if (err) throw err;
                return callback(blacklists);
            });
            connection.release();
        })
    },

    /**
     * 移除黑名单
     * @param req
     * @param res
     * @param callback
     */
    remove_BlackList: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.BlackListSql.removeBlacklist,[req.body.b_id],function (err,result) {
                if(err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    }

}