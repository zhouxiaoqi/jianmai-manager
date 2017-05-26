var express = require("express");
var router = express.Router();
var reportDao = require('../dao/reportDao');
var moment = require('moment');


router.post('/getallreports', function (req, res) {
    reportDao.getAllReport(function (reports) {
        moment.locale('zh-cn');
        for (var i = 0; i < reports.length; i++) {
            reports[i].r_ctime = moment(reports[i].r_ctime).fromNow();
        }
        res.send(reports);
        return;
    });
});

router.post('/dealwithed', function (req, res) {
    reportDao.alreadyDealWith(req, function (result) {
        if (result > 0) {
            res.send({ result: 1 });
            return;
        } else {
            res.send({ result: 0 });
        }
    })
})

module.exports = router;