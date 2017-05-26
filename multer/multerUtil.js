/**
 * Created by zhouqi on 2017/3/30.
 */
var multer = require('multer');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },

    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0] + '-' + new Date() + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({storage: storage})


module.exports = upload;