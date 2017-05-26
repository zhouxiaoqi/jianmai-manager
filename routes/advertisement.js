/**
 * Created by zhouqi on 2017/4/23.
 */
var express = require('express');
var adverDao = require('../dao/advertisementDao');
var upload = require('../multer/multerUtil');
var fdfsUtil = require('../fdfs/fdfsUtil');
var router = express.Router();

router.post('/getpostions', function (req, res) {
    adverDao.get_AdPostion(function (postions) {
        res.send(postions);
    })
})

router.post('/updatead', upload.single('ad_image'), function (req, res, next) {
    var file = req.file;
    fdfsUtil.uploadFile(file.path, function (imageUrl) {
        req.ad_image = imageUrl;
        next();
    })
});

router.post('/updatead', function (req, res) {
    adverDao.update_Ad(req, function (result) {
        if (result > 0) {
            res.send({res: 1});
            return;
        } else {
            res.send({res: 0});
        }
    })
});


router.post('/getallad', function (req, res) {
    adverDao.getAllAd(function (alladvers) {
        for (var i = 0; i < alladvers.length; i++) {
            fdfsUtil.mosaicUrl(alladvers[i].ad_image, function (imageurl) {
                alladvers[i].ad_image = imageurl;
            })
        }
        res.send(alladvers);
        return;
    })
})

module.exports = router;