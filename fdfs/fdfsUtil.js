/**
 * Created by zhouqi on 2017/3/29.
 */
var fdfs = require('../fdfs/fdfs');

module.exports = {

    /**
     * 上传文件到服务器
     * @param file
     * @param callback
     */
    uploadFile: function (file, callback) {
        fdfs.upload(file, function (err, fileId) {
            if (err) return console.log(err);
            return callback(fileId)
        })
    },

    /**
     * 拼接url
     * @param fileId
     * @param callback
     * @return {*}
     */
    mosaicUrl:function (fileId,callback) {
        var host = 'http://www.zhouqifun.cn/';
        var realUrl = host+fileId;
        return callback(realUrl);
    }
}