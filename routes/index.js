var express = require('express');
var common = require('../common/commonUtil');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('login', { title: '管理员登录' });
})

router.post('/getLevel', function(req, res) {
    var admin = req.session.admininfo[0];
    res.send(admin);
})


router.get('/users', function(req, res, next) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('users', { title: '简买后台管理' });
        } else {
            res.redirect('/');
        }
    })

});

router.get('/advertisement', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('advertisement', { title: '广告位置' });
        } else {
            res.redirect('/');
        }
    })

})


router.get('/blacklist', function(req, res, next) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('blacklist', { title: '黑名单' });
        } else {
            res.redirect('/');
        }
    })
});

router.get('/type', function(req, res, next) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('type', { title: '类别管理' });
        } else {
            res.redirect('/');
        }
    })

});


router.get('/school', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('school', { title: '学校信息管理' });
        } else {
            res.redirect('/');
        }
    })
});


router.get('/goods', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('goods', { title: '商品信息管理' });
        } else {
            res.redirect('/');
        }
    })
});

router.get('/want', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('want', { title: '求购信息管理' })
        } else {
            res.redirect('/');
        }
    })

});

router.get('/report', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('report', { title: '举报信息' });
        } else {
            res.redirect('/');
        }
    })

});

router.get('/super', function(req, res) {
    common.isLogin(req, function(isLogin) {
        if (isLogin) {
            res.render('supermanager', { title: '超级管理员' });
        } else {
            res.redirect('/');
        }
    })

})


module.exports = router;