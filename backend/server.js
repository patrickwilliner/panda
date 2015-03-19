'use strict';

var express      = require('express');
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var http         = require('http');
var path         = require('path');
var morgan       = require('morgan');
var fs           = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var env = process.argv[2] || 'dev';
var config = require('./config/profiles/' + env)();

var port     = process.env.PORT || 3000;
var ip       = process.env.IP || 'localhost';

var app = express();

var connection = require('./config/database')(mongoose, config);
var models = require('./models/models')(connection);
require('./config/passport')(passport, models);

// access log
if (env !== 'heroku') {
	var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
	app.use(morgan('combined', {stream: accessLogStream}));	
}

// set up express application
app.set('port', port);
app.use(cookieParser());
app.set('view engine', 'html'); // set up html for templating
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/../app/views');
app.use(express.static(path.join(__dirname, '/../app')));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name: 'pandalinks',
    secret: '*y%c--:17TzsSq+=$$$'
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes.js')(app, passport, models);

// development only
if (env !== 'heroku') {
    app.use(require('errorhandler'));
} else {
	// TODO
}

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + ip + ':' + server.address().port);
});