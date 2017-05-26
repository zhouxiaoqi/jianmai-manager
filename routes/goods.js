/**
 * Created by zhouqi on 2017/4/5.
 */
var express = require('express');
var goodsDao = require('../dao/goodsDao');
var redisClient = require('../redis/redisClient');
var KEYS = require('../redis/KEYS');
var router = express.Router();

/**
 * 获取所有学校
 */
router.post('/getschools', function (req, res) {
    goodsDao.getAllSchools(function (schools) {
        res.send(schools);
    })
});

/**
 * 获取所有商品
 */
router.post('/getgoods', function (req, res) {
    goodsDao.getAllGoods(function (goods) {
        res.send(goods);
    })
});

/**
 * 筛选商品
 */
router.post('/screengoods', function (req, res) {
    goodsDao.screenGoods(req, function (goods) {
        res.send(goods);
    })
})

/**
 * 商品通过审核或商品下架
 */
router.post('/allowcheckOrNot', function (req, res) {
    redisClient.hdel(KEYS.REDIS_GOODS,req.body.g_id);
    goodsDao.allowCheckOrNot(req, function (affectRows) {
        if (affectRows > 0) {
            res.send({ result: 1 });
            return;
        } else {
            res.send({ result: 0 });
        }
    })
});

/**
 * 驳回
 */
router.post('/reject', function (req, res, next) {
    console.log(req);
    goodsDao.reject(req, function (result) {
        if (result > 0) {
            res.send({ result: 1 });
            return;
        } else {
            res.send({ result: 0 });
        }
    })
});

// 按商品名查询商品
router.post('/searchGoods', function (req, res) {
    goodsDao.searchByGoodsName(req, function (goods) {
        if(goods !== null && goods !== ''){
            res.send(goods);
            return;
        }else{
            res.send(null);
        }
    })
})

module.exports = router;