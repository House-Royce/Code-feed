var mongoose = require('mongoose');
var config = require('./../../config/config');

var utils = require('../../lib/utils');

var Schema = mongoose.Schema;

var getTags = function (tags) {
  return tags.join(',');
};

var setTags = function (tags) {
  return tags.split(',');
};

var QuestionSchema = new Schema({
  title: {type : String, default : '', trim : true},
  body: {type : String, default : '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  tags: {type: [], get: getTags, set: setTags},
  createdAt  : {type : Date, default : Date.now}
});

 // Validations
QuestionSchema.path('title').required(true, 'Question title cannot be blank');
QuestionSchema.path('body').required(true, 'Question body cannot be blank');

// Methods
QuestionSchema.methods = {
  addComment: function (user, comment, cb) {
    var notify = require('../mailer');

    this.comments.push({
      body: comment.body,
      user: user._id
    });

    if (!this.user.email) {
      this.user.email = 'email@product.com';
    }
    notify.comment({
      question: this,
      currentUser: user,
      comment: comment.body
    });

    this.save(cb);
  },

  removeComment: function (commentId, cb) {
    var index = utils.indexof(this.comments, { id: commentId });
    if (~index) this.comments.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  }
};

QuestionSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      .populate('comments.user')
      .exec(cb);
  },

  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
};

mongoose.model('Question', QuestionSchema);
