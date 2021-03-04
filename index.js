const dotenv = require('dotenv');
dotenv.config();

let session = require('express-session');
let ejs = require('ejs');
let express = require('express');
let passport = require('passport');
let bodyParser = require('body-parser');
let config = require('config');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

const app = express()
const port = process.env.PORT || 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // true
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'zqzu8iKgHAM2kekuMXnm',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
// app.use(passport.session());

//CORS
app.all('/api/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    return next();
});

let testRouter = require('./routes/test');

app.use('/api/test', testRouter);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Running at :: ${port}`);
})