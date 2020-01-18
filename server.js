// UI Development Environment
var express = require('express');
var exphbs  = require('express-handlebars');
var i18n = require("i18n");
var cookieParser = require('cookie-parser');

var app = express();

// browser-refresh
app.locals.BROWSER_REFRESH_URL = process.env.BROWSER_REFRESH_URL;

// applying Handlebar engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        __: function () {
            return i18n.__.apply(this, arguments);
        }
    }
}));
app.set('view engine', 'handlebars');

//configure language
i18n.configure({
    locales:['en', 'ar'],
    directory: __dirname + '/locales',
    defaultLocale: 'ar',
    cookie: 'locale'
});
app.use(cookieParser());
app.use(i18n.init);

//to access static files such as css and js
app.use('/dist', express.static('./dist'));
app.use('/assets/lib', express.static('./assets/lib'));
//app.use('/fonts', express.static('./assets/lib/dopravo/css/fonts'));
//app.use('/node_modules/@fortawesome/fontawesome-free/webfonts', express.static('./node_modules/@fortawesome/fontawesome-free/webfonts'));
//app.set('/assets/lib/dopravo/css/fonts', 'fonts');

//direct if URL/locale is entered
app.get('/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/');
});

// default page
app.get('/', function (req, res) {
    res.render('home');
});

// browser-refresh
app.listen(3000, function(){
    if (process.send) {
        process.send('online');
    }
});