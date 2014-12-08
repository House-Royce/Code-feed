var mongoose = require('mongoose');
var Question = mongoose.model('Question');

exports.index = function (req, res) {
  var criteria = { tags: req.param('tag') };
  var perPage = 5;
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var options = {
    perPage: perPage,
    page: page,
    criteria: criteria
  };

  Question.list(options, function(err, questions) {
    if (err) return res.send('500');
    Question.count(criteria).exec(function (err, count) {
      res.send({
        title: 'Questions tagged ' + req.param('tag'),
        questions: questions,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};
