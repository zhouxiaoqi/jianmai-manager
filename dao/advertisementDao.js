/**
 * Created by zhouqi on 2017/4/23.
 */
var sql = require('../mysql/sql');
var pool = require('../mysql/db');
var redisClient = require('../redis/redisClient');
var KEYS = require('../redis/KEYS');
module.exports = {

    /**
     * 得到广告位置供您选择
     * @param callback
     */
    get_AdPostion: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) throw  err;
            connection.query(sql.AdvertisementSql.getAdPostion, function (err, positions) {
                if (err) throw err;
                return callback(positions);
            })
            connection.release();
        })
    },

    /**
     * 更改广告
     * @param req
     * @param callback
     */
    update_Ad: function (req, callback) {
        //更新前先删除缓存
        redisClient.del(KEYS.REDIS_ADVER_CONTENT);
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.AdvertisementSql.updateAd, [req.ad_image, req.body.ad_desc, req.body.ad_id], function (err, result) {
                if (err) throw err;
                return callback(result.affectedRows);
            })
            connection.release();
        });
    },

    /**
     * 得到所有广告列表
     */
    getAllAd: function (callback) {

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql.AdvertisementSql.getAllAd, function (err, advers) {
                if (err) throw err;
                return callback(advers);
            });
            connection.release();
        })

    }
}