/**
 * Created by zhouqi on 2017/3/31.
 */
var express = require("express");
var upload = require('../multer/multerUtil');
var fdfs = require('../fdfs/fdfsUtil');
var schoolDao = require('../dao/schoolDao');
var router = express.Router();


// 开通学校
router.post('/insertschool', upload.single('badge'), function(req, res) {
    var file = req.file;
    fdfs.uploadFile(file.path, function(fieId) {
        schoolDao.inertSchool(req, fieId, function(result) {
            if (result > 0) {
                res.send({ result: 1 });
                return;
            }
            res.send({ result: 0 });
        })
    })
});

// 得到所有学校
router.post('/getallschool', function(req, res) {
    schoolDao.getAllSchool(function(schools) {
        for (var i = 0; i < schools.length; i++) {
            var host = 'http://www.zhouqifun.cn/';
            schools[i].s_badge = host + schools[i].s_badge;
        }
        res.send(schools);
    })
});

// 显示或隐藏学校
router.post('/showornot', function(req, res) {
    schoolDao.showornot(req, function(result) {
        if (result > 0) {
            res.send({ result: 1 });
            return;
        }
        res.send({ result: 0 })
    })
});



module.exports = router;