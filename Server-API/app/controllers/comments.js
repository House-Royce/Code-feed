var mongoose = require('mongoose');
var utils = require('../../lib/utils');

exports.load = function (req, res, next, id) {
  var question = req.question;
  utils.findByParam(question.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

exports.create = function (req, res) {
  var question = req.question;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/questions/'+ question.id);

  question.addComment(user, req.body, function (err) {
    if (err) return res.send('500');
    res.redirect('/questions/'+ question.id);
  });
};

exports.destroy = function (req, res) {
  var question = req.question;
  question.removeComment(req.param('commentId'), function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/questions/' + question.id);
  });
};
