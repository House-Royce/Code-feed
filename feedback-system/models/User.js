var mongoose = require('mongoose'),
    Question = require('./Question'),
    Comment = require('./Comment'),
    Category = require('./Category');

module.exports.loadUsersSchema = function () {
    var userSchema = new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        avatar: String,
        socialLinks: {
            facebook: String,
            twitter: String,
            softUni: String,
            gitHub: String
        },
        points: Number,
        questions: [Question],
        comments: [Comment],
        preferences: {
            languages: [Category]
        }
    });

    var User = mongoose.model('users', userSchema);
};