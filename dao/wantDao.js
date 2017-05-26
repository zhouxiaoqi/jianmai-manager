/**
 * Created by zhouqi on 2017/4/17.
 */
var sql = require('../mysql/sql');
var pool = require('../mysql/db');


module.exports = {

    // 得到所有求购信息
    getAllWant: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.WantSql.getAllWant, function (err, datas) {
                if (err) throw err;
                return callback(datas);
            })
            connection.release();
        })
    },

    /**
     * 求购信息通过或下架（通用方法）
     * @param req
     * @param callback
     */
    allowCheckOrNot: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw  err;
            connection.query(sql.WantSql.allowCheckOrNot, [req.body.state, req.body.w_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    },

    /**
     * 求购信息审核驳回
     * @param req
     * @param callback
     */
    rejectWant: function (req,callback) {
        pool.getConnection(function (err,connection) {
            if(err) throw err;
            connection.query(sql.WantSql.reject_want,[req.body.reason,req.body.w_id],function (err,result) {
                if(err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    }
}