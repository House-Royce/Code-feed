exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method === 'GET') req.session.returnTo = req.originalUrl;
  res.send('Only registered users can publish new questions');
};

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

exports.question = {
  hasAuthorization: function (req, res, next) {
    if (req.question.user.id !== req.user.id) {
      return res.redirect('/questions/' + req.question.id);
    }
    next();
  }
};

exports.comment = {
  hasAuthorization: function (req, res, next) {
    // if the current user is comment owner or question owner
    // give them authority to delete
    if (req.user.id === req.comment.user.id || req.user.id === req.question.user.id) {
      next();
    } else {
      res.redirect('/questions/' + req.question.id);
    }
  }
};