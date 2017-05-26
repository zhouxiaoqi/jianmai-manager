/**
 * Created by zhouqi on 2017/3/28.
 */
var express = require('express');
var userDao = require('../dao/usersDao');
var router = express.Router();


/**
 * 得到所有user
 */
router.post('/alluser', function (req, res) {
    userDao.get_AllUsers(req, res, function (users) {
        res.send(users);
    })
});

/**
 * 封号
 */
router.post('/addblacklist', function (req, res) {
    userDao.insert_blacklist(req, res, function (result) {
        if(result > 0){
            res.send('1');
            return;
        }
        res.send('0');
    })
});

/**
 *
 */
router.post('/search',function (req,res) {
    userDao.search_User(req,res,function (user) {
        res.send(user);
    })
})

module.exports = router;