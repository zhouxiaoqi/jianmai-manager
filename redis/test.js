/**
 * Created by zhouqi on 2017/4/23.
 */
var redisClient = require('../redis/redisClient');

redisClient.hget("REDIS_TYPE_GOODS", "22", function (data) {
    console.log(data);
})