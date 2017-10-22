var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); 
var request = require('request'); 
var cheerio = require('cheerio');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// if(process.env.NODE_ENV == 'production'){
//   mongoose.connect('mongodb://heroku_60zpcwg0:ubn0n27pi2856flqoedo9glvh8@ds119578.mlab.com:19578/heroku_60zpcwg0');
// }
// else{
  // mongoose.connect("mongodb://localhost/techscraper", {
//   useMongoClient: true
// });

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/techscraper", {
  useMongoClient: true
});

var db = mongoose.connection;

var Comment = require('./models/Note.js');
var Article = require('./models/Article.js');

// routers
var router = require('./controllers/controller.js');
app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});