var moment = require("moment");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false,
    required: true
},
  updated: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm A')
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;