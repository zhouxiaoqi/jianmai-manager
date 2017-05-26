/**
 * Created by zhouqi on 2017/4/5.
 */
var sql = require('../mysql/sql');
var pool = require('../mysql/db');

module.exports = {

    /**
     * 取出所有已经显示的种类
     * @param callback
     */
    getAllSchools: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.GoodsSql.getAllSchools, function (err, schools) {
                if (err) throw err;
                return callback(schools);
            })
            connection.release();
        })
    },

    /**
     * 取出所有商品
     * @param callback
     */
    getAllGoods: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.GoodsSql.getAllGoods, function (err, goods) {
                if (err) throw err;
                return callback(goods);
            })
            connection.release();
        })
    },

    /**
     * 筛选
     * @param req
     * @param callback
     */
    screenGoods: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            if (req.body.select_school === '' && req.body.select_showornot === '') {
                connection.query(sql.GoodsSql.getAllGoods, function (err, goods) {
                    if (err) throw err;
                    return callback(goods);
                })
            } else if (req.body.select_school !== '' && req.body.select_showornot === '') {
                var select_sql = ' and g.school_id = ?';
                connection.query(sql.GoodsSql.getAllGoods + select_sql, [req.body.select_school], function (err, goods) {
                    if (err) throw err;
                    return callback(goods);
                })
            } else if (req.body.select_school === '' && req.body.select_showornot !== '') {
                var select_sql = ' and g.g_showornot = ?';
                connection.query(sql.GoodsSql.getAllGoods + select_sql, [req.body.select_showornot], function (err, goods) {
                    if (err) throw err;
                    return callback(goods);
                })
            } else {
                var select_sql = ' and g.school_id = ? and g.g_showornot = ?';
                connection.query(sql.GoodsSql.getAllGoods + select_sql, [req.body.select_school, req.body.select_showornot], function (err, goods) {
                    if (err) throw err;
                    return callback(goods);
                })
            }
            connection.release();
        })
    },

    /**
     * 商品通过审核或者下架
     * @param req
     * @param callback
     */
    allowCheckOrNot: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.GoodsSql.allowCheckOrNot, [req.body.showornot, req.body.g_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            })
            connection.release();
        })
    },


    /**
     * 驳回
     * @param req
     * @param callback
     */
    reject: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.GoodsSql.reject, [req.body.r_content, req.body.g_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    },
    /**
     * 按商品名查询商品
     * @param req
     * @param callback
     */
    searchByGoodsName: function (req, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.GoodsSql.searchByGoodsName, [req.body.q], function (err, goods) {
                if (err) throw err;
                return callback(goods);
            });
            connection.release();
        })
    }
}