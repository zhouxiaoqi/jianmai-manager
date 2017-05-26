/**
 * Created by zhouqi on 2017/3/31.
 */
var pool = require('../mysql/db');
var sql = require('../mysql/sql');

module.exports = {

    // 开通学校
    inertSchool: function (req, badge, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw (err + '开通学校连接池出错');
            connection.query(sql.SchoolSql.inertSchool, [req.body.schoolname, badge, req.body.schooladdress, req.body.campus], function (err, result) {
                if (err) throw(err + '执行sql语句出错');
                return callback(result.affectedRows);
            });
            connection.release();
        })
    },

    // 学校列表
    getAllSchool: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw (err + '学校列表连接池出错');
            connection.query(sql.SchoolSql.getAllSchool, function (err, schools) {
                if (err) throw(err + '执行sql语句出错');
                return callback(schools);
            });
            connection.release();
        })
    },

    //显示或隐藏学校
    showornot: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.SchoolSql.showornot, [req.body.state, req.body.s_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    }
}
