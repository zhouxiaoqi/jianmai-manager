/**
 * Created by zhouqi on 2017/4/23.
 */
var redis = require('redis');
var client = redis.createClient(6379, "127.0.0.1", {});

client.auth("123");


module.exports = client;