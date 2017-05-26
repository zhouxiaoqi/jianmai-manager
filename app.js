var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var login = require('./routes/login');  
var index = require('./routes/index');
var advertisement = require('./routes/advertisement');
var users = require('./routes/users');
var blacklist = require('./routes/blacklist');
var type = require('./routes/type');
var school = require('./routes/school');
var goods = require('./routes/goods');
var want = require('./routes/want');
var report = require('./routes/report');
var supermanager = require('./routes/supermanager');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(cookieParser('jianmai-admin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'jianmai-admin',
    cookie: {maxAge: 60 * 1000 * 60}, // 过期时间（毫秒）
    saveUninitialized:true,
    rolling:true
}));

app.use('/', index);
app.use('/advertisement',advertisement);
app.use('/users', users);
app.use('/blacklist', blacklist);
app.use('/type', type);
app.use('/school', school);
app.use('/goods', goods);
app.use('/want', want);
app.use('/report',report);
app.use('/super',supermanager);
app.use('/login',login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
