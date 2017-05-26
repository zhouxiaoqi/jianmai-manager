module.exports = {

    /**
     * 判断是否登录
     */
    isLogin: function (req, callback) {
        console.log(req.session.admininfo);

        if(req.session.admininfo === "" || req.session.admininfo === undefined){
            return callback(false);
        }else{
            return callback(true);
        }
    }
}