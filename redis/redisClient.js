/**
 * Created by zhouqi on 2017/4/23.
 */
var redis = require('../redis/redisConfig');

// redis一些基本操作
module.exports = {

    set: function (key, value) {
        redis.set(key, value);
        redis.quit();
    },

    get: function (key, callback) {
        redis.get(key, function (err, data) {
            if (err) throw err;
            redis.quit();
            return callback(data);
        })
    },

    del: function (key) {
        redis.del(key,function (err,result) {  
            redis.quit();
        });  
    },

    hset: function (key, item, value) {
        redis.hset(key, item, value);
        redis.quit();
    },

    hget: function (key, item, callback) {
        redis.hget(key, item, function (err, data) {
            if (err) throw err;
            redis.quit();
            return callback(data);
        })
    },

    hdel: function (key, item) {
        redis.hdel(key, item, function (err, result) {
            redis.quit();
        });
    },

}