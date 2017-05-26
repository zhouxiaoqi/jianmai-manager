/**
 * Created by zhouqi on 2017/3/29.
 */
var express = require('express');
var fs = require('fs');
var upload = require('../multer/multerUtil');
var fdfsUtil = require('../fdfs/fdfsUtil');
var typeDao = require('../dao/typeDao');
var redisClient = require('../redis/redisClient');
var KEYS = require('../redis/KEYS');
var router = express.Router();


router.post('/inserttype', upload.array('typeimg', 2), function (req, res, next) {
    var files = req.files;
    var typeimgforpc, typeimgforphone;
    fdfsUtil.uploadFile(files[0].path, function (imgforpcurl) {
        req.typeimgforpc = imgforpcurl;
        req.phonepath = files[1].path;
        next();
    });

});

router.post('/inserttype', function (req, res, next) {
    fdfsUtil.uploadFile(req.phonepath, function (imgforphoneurl) {
        req.typeimgforphone = imgforphoneurl;
        next();
    })
});

router.post('/inserttype', function (req, res) {
    redisClient.del(KEYS.REDIS_ALL_TYPE);
    typeDao.insertType(req, function (result) {
        if (result > 0) {
            res.send({result: 1});
            return;
        }
        res.send({result: 0});
    })
});

router.post('/getalltype', function (req, res) {
    var host = "http://www.zhouqifun.cn/";
    typeDao.getAllType(function (types) {
        for (var i = 0; i < types.length; i++) {
            types[i].t_typeimgforpc = host + types[i].t_typeimgforpc;
            types[i].t_typeimgforphone = host + types[i].t_typeimgforphone;
        }
        res.send(types);
    })

});


router.post('/showornot', function (req, res) {
    typeDao.showornot(req, function (result) {
        if (result > 0) {
            res.send({result: 1});
            return;
        }
        res.send({result: 0})
    })
});

router.post('/updateTypeInfo', function (req, res) {
    redisClient.del(KEYS.REDIS_ALL_TYPE);
    typeDao.updateTypeInfo(req, function (result) {
        if (result > 0) {
            res.send({result: 1});
            return;
        }
        res.send({result: 0});
    })
})


module.exports = router;