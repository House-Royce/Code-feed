var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

var local = require('./passport/local');
//var google = require('./passport/google');
//var facebook = require('./passport/facebook');
//var twitter = require('./passport/twitter');
//var github = require('./passport/github');

module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user)
    })
  });

  // use these strategies
  passport.use(local);
  //passport.use(google);
  //passport.use(facebook);
  //passport.use(twitter);
  //passport.use(github);
};
