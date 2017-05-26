var pool = require('../mysql/db');
var sql = require('../mysql/sql');

module.exports = {
    // 得到所有举报信息
    getAllReport: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.ReportSql.getAllReportNotDealWith, function (err, reports) {
                if (err) throw err;
                return callback(reports);
            })
            connection.release();
        });
    },

    // 已受理
    alreadyDealWith: function (req, callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.ReportSql.updateAlreadyDealWidth, [req.body.g_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            });
            connection.release();
        })
    }
}