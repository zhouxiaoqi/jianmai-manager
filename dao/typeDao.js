/**
 * Created by zhouqi on 2017/3/29.
 */
var sql = require('../mysql/sql');
var pool = require('../mysql/db');
module.exports = {

    /**
     * 添加种类
     * @param req
     * @param res
     * @param callback
     */
    insertType: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.TypeSql.insertType,
                [req.body.typename, req.typeimgforpc, req.body.typedesc, req.typeimgforphone], function (err, result) {
                    if (err) throw err;
                    return callback(result.affectedRows)
                });
            connection.release();
        })
    },

    /**
     * 得到所有的种类信息
     * @param callback
     */
    getAllType: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.TypeSql.getAllTypes, function (err, types) {
                if (err) throw err;
                return callback(types);
            });
            connection.release();
        })
    },

    /**
     * 显示或隐藏该种类信息
     * @param req
     * @param callback
     */
    showornot: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw  err;
            connection.query(sql.TypeSql.showornot, [req.body.state, req.body.t_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    },

    /**
     * 修改种类信息
     * @param req
     * @param callback
     */
    updateTypeInfo: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.TypeSql.updateTypeInfo, [req.body.typename, req.body.typedesc, req.body.t_id], function (err,result) {
                if(err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    }
}