module.exports = {
  //db: process.env.MONGOHQ_URL,
  db: 'mongodb://admin:administrat0r@dogen.mongohq.com:10090/CodeReviewDB',
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://code-review-system.herokuapp.com/auth/facebook/callback"
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: "http://code-review-system.herokuapp.com/auth/facebook/callback"
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://code-review-system.herokuapp.com/auth/facebook/callback'
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://code-review-system.herokuapp.com/auth/facebook/callback"
  }
};
