var express = require('express');
var loginDao = require('../dao/loginDao');
var router = express.Router();

router.post('/adminLogin', function (req, res) {
    loginDao.adminLogin(req, function (admin) {
        if (admin.length > 0) {
            req.session.admininfo = admin;
            res.send({ result: 1 });
        } else {
            res.send({ result: 0 });
        }
    })
}),

router.get('/logout',function (req,res) {  
    req.session.admininfo = '';
    res.redirect('/');
})

module.exports = router;