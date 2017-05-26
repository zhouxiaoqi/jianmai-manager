var express = require('express');
var supermanagerDao = require('../dao/supermanagerDao');
var router = express.Router();

router.post('/addManager', function (req, res) {
    supermanagerDao.addManager(req, function (result) {
        if (result > 0) {
            res.send({ result: 1 });
            return;
        } else {
            res.send({ result: 0 });
        }
    })
}),

    router.post('/validate', function (req, res) {
        supermanagerDao.validate(req, function (result) {
            if (result.length > 0) {
                res.send({ result: 1 });
                return;
            } else {
                res.send({ result: 0 })
            }
        })
    }),

    router.post('/getNormalAdmins', function (req, res) {
        supermanagerDao.getAllNormalAdmin(function (admins) {
            res.send(admins);
        })
    })

module.exports = router;