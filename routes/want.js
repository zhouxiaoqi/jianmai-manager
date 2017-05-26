/**
 * Created by zhouqi on 2017/4/17.
 */

var express = require('express');
var wantDao = require('../dao/wantDao');
var router = express.Router();

// 得到所有求购信息
router.post('/getallwant', function (req, res) {
    wantDao.getAllWant(function (wants) {
        res.send(wants);
    })
});

// 通过与下架
router.post('/checkornot', function (req, res) {
    wantDao.allowCheckOrNot(req, function (result) {
        if (result > 0) {
            res.send({res: 1});
            return;
        } else {
            res.send({res: 0});
        }
    })
});

// 求购商品审核驳回
router.post('/wantreject', function (req, res) {
    wantDao.rejectWant(req, function (result) {
        if (result > 0) {
            res.send({res: 1});
            return;
        } else {
            res.send({res: 0});
        }
    })
})


module.exports = router;