// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('./../app/controllers/users');
var questions = require('./../app/controllers/questions');
var comments = require('./../app/controllers/comments');
var tags = require('./../app/controllers/tags');
var auth = require('./middlewares/authorization');

var questionAuth = [auth.requiresLogin, auth.question.hasAuthorization];
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

module.exports = function (app, passport) {
  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.get('/users/:userId', users.show);

  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.param('userId', users.load);

  // Question routes
  app.param('id', questions.load);
  app.get('/questions', questions.index);
  app.get('/questions/new', auth.requiresLogin, questions.new);
  app.post('/questions', auth.requiresLogin, questions.create);
  app.get('/questions/:id', questions.show);
  app.get('/questions/:id/edit', questionAuth, questions.edit);
  app.put('/questions/:id', questionAuth, questions.update);
  app.delete('/questions/:id', questionAuth, questions.destroy);

  // home route
  app.get('/', questions.index);

  // comment routes
  app.param('commentId', comments.load);
  app.post('/questions/:id/comments', auth.requiresLogin, comments.create);
  app.get('/questions/:id/comments', auth.requiresLogin, comments.create);
  app.delete('/questions/:id/comments/:commentId', commentAuth, comments.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);

  // Error handling
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).send('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};