// set dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request'); 
var cheerio = require('cheerio');

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

router.get('/', function (req, res){
  res.redirect('/scrape');
});

// route for get articles and notes
router.get('/articles', function (req, res){
  Article.find().sort({_id: 1})
    .populate('notes')
    .exec(function(err, doc){
      if (err){
        console.log(err);
      } 
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });
});

// route for scrape articles and check data
router.get('/scrape', function(req, res) {
  request("https://www.techbargains.com", function(error, response, html) {
  var $ = cheerio.load(html);
    var titlesArray = [];
    $("a.ga_in_deal").each(function(i, element) {
        var result = {};
        result.title = $(this).text();
        result.link = 'https://www.techbargains.com' + $(this).attr("href");
        result.summary = $(this).attr("data-store");

        if(result.title !== "" &&  result.summary !== ""){
          if(titlesArray.indexOf(result.title) == -1){
            titlesArray.push(result.title);
            Article.count({ title: result.title}, function (err, test){
              if(test == 0){
                var entry = new Article (result);

                entry.save(function(err, doc) {
                  if (err) {
                    console.log(err);
                  } 
                  else {
                  }
                });
              }
              else{
                console.log('Duplicate')
              }
            });
          }      
        else{
          console.log('Duplicate')
        }
      }
      else{
        console.log('Empty Content')
      }
    });
    res.redirect("/articles");
  });
});

// route for add note
router.post('/add/note/:id', function (req, res){
  var articleId = req.params.id;
  var noteTitle = req.body.title;
  var noteContent = req.body.note;
  var result = {
    title: noteTitle,
    content: noteContent
  };

  var entry = new Note (result);
  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
    } 
    else {
      Article.findOneAndUpdate({'_id': articleId}, {$push: {'notes':doc._id}}, {new: true})
      .exec(function(err, doc){
        if (err){
          console.log(err);
        } 
        else {
          res.redirect("/articles");
        }
      });
    }
  });
});

// route for delete note
router.post('/remove/note/:id', function (req, res){
  var noteId = req.params.id;
  Note.findByIdAndRemove(noteId, function (err, todo) {    
    if (err) {
      console.log(err);
    } 
    else {
      res.redirect("/articles");
    }
  });
});


module.exports = router;