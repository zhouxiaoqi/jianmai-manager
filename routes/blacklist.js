/**
 * Created by zhouqi on 2017/3/29.
 */
var express = require('express');
var blacklistDao = require('../dao/blacklistDao');
var router = express.Router();

/**
 * 加入黑名单
 */
router.post('/allblacklist', function (req, res) {
    blacklistDao.get_AllBlackList(req, res, function (blacklist) {
        res.send(blacklist);
    })
});

/**
 * 把用户移除黑名单
 */
router.post('/remove', function (req,res) {
    blacklistDao.remove_BlackList(req,res,function (result) {
        if(result > 0){
            res.send('1');
            return;
        }
        res.send('0');
    })
})

module.exports = router;