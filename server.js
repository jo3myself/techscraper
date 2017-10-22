// set dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); 
var request = require('request'); 
var cheerio = require('cheerio');

// Configure middleware
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_ld8jsk2q:s5lanac4irjlgtt3cnek8ps2v2@ds025439.mlab.com:25439/heroku_ld8jsk2q", {
  useMongoClient: true
});

var db = mongoose.connection;

// require
var Comment = require('./models/Note.js');
var Article = require('./models/Article.js');

// routers
var router = require('./controllers/controller.js');
app.use('/', router);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});