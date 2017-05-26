var FdfsClient = require('co-fdfs-client');
var fdfs = new FdfsClient({
    // tracker servers
    trackers: [
        {
            host: '123.207.107.198',
            port: 22122
        }
    ],
    // 默认超时时间10s
    timeout: 10000,
    // 默认后缀
    // 当获取不到文件后缀时使用
    defaultExt: 'txt',
    // charset默认utf8
    charset: 'utf8'
});


module.exports = fdfs;

