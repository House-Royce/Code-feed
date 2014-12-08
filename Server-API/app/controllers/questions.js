var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var utils = require('../../lib/utils');
var extend = require('util')._extend;

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Question.load(id, function (err, question) {
    if (err) return next(err);
    if (!question) return next(new Error('not found'));
    req.question = question;
    next();
  });
};

exports.index = function (req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Question.list(options, function (err, questions) {
    if (err) {
      console.log('\n\r\t\t in Question.list');
      return res.send('500');
    }

    Question.count().exec(function (err, count) {
      res.send({
        title: 'Question',
        questions: questions,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

exports.new = function (req, res){
  res.send({
    title: 'New Question',
    question: new Question({})
  });
};

exports.create = function (req, res) {
  var question = new Question(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;
  question.user = req.user;
  question.uploadAndSave(images, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created question!');
      return res.redirect('/questions/'+question._id);
    }
    console.log(err);
    res.send({
      title: 'New Question',
      question: question,
      errors: utils.errors(err.errors || err)
    });
  });
};

exports.edit = function (req, res) {
  res.send({
    title: 'Edit ' + req.question.title,
    question: req.question
  });
};

exports.update = function (req, res){
  var question = req.question;

  // make sure no one changes the user
  delete req.body.user;
  question = extend(question, req.body);

  // TODO: Update function
  //  res.send({
  //    title: 'Edit Question',
  //    question: Question,
  //    errors: utils.errors(err.errors || err)
  //  });
};

exports.show = function (req, res){
  res.send({
    title: req.question.title,
    question: req.question
  });
};

exports.destroy = function (req, res){
  var question = req.question;
  question.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/questions');
  });
};