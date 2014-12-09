var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      return res.send({
        error: utils.errors(err.errors),
        user: user,
        title: 'Sign up'
      });
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) req.send('info', 'Sorry! We are not able to log you in!');
      return res.send(user._id);
    });
  });
};

exports.show = function (req, res) {
  var user = req.profile;
  res.send({
    title: user.name,
    user: user
  });
};

exports.signin = function (req, res) {};
exports.authCallback = login;
exports.signup = function (req, res) {
  res.send({
    title: 'Sign up',
    user: new User()
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.statusCode(200);
};

exports.session = login;

function login (req, res) {
  delete req.session.returnTo;
  res.redirect('/users/' + req.user._id);
}
