/** 
 * Portfolio Server
 * v2.0.0
 * 6/3/17
 */
var express       = require('express'),
	bodyParser    = require('body-parser'),
	chalk         = require('chalk'),
	app 	      = express(), 
	server 	      = require('http').createServer(app),
    nodemailer    = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    expressStaticGzip = require("express-static-gzip");

var generator = require('xoauth2').createXOAuth2Generator({
    user: "echoghi@gmail.com",
    clientId: "1099174116489-oh760121thk83ckupaq83pn7gkju6fj2.apps.googleusercontent.com",
    clientSecret: "Cs9qMrCMrYdONo5BCXmBtYph",
    refreshToken: "1/rh4PjNbgiZ8T0dwK0vjsFoArnXDHpG8xb22LQ9CPbbhmDQcxQDzou3OiRsMAxOgv"
});

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "echoghi@gmail.com",
        pass: "echoghipotac877"
    }
});

require('es6-promise').polyfill();
require('isomorphic-fetch');
var port = 3000;

// Configure app to use bodyParser to parse json data
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// API Config
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(expressStaticGzip(__dirname + '/build'));

app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Type', 'text/javascript');
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('*.css', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Type', 'text/css');
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/postForm', function(req, res) {
    try {
        console.log(chalk.green('Sending email...'), req.body);

        transporter.sendMail({
           from: 'echoghi@gmail.com',
           to: 'emchoghi@gmail.com',
           subject: 'Message from ' + req.body.name + ' - ' + req.body.email,
           text: 'Message:\n' + req.body.message
        }, function(err, info) {
          if(err) {
            console.log(chalk.red(err));
          } else {
            res.status(200).json({'message': 'Email Sent', 'details' : info});
            console.log(chalk.green('Message Sent: ' + info.response));
          }
        });
    } catch(err) {
        console.log(chalk.red("Error occured sending the email", err));
        res.status(500).json({'message': 'Error occured sending the email', 'details' : err});
    }

    transporter.close();
});

// Start the server
server.listen(port, function() {
    console.log(chalk.green('listening on port 3000'));
});