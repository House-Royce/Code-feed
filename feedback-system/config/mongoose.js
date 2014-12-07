var mongoose = require('mongoose'),
    Forum = require('./../models/Forum'),
    Comment = require('./../models/Comment'),
    Snippet = require('./../models/Snippet'),
    Question = require('./../models/Question'),
    Category = require('./../models/Category'),
    User = require('./../models/User');

module.exports = function () {
    mongoose.connect('mongodb://localhost/feedback_system');
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    require('./../models/Comment').loadCommentsSchema();
    require('./../models/Snippet').loadSnippetsSchema();
    //require('./../models/Question').loadQuestionsSchema();
    //require('./../models/Category').loadCategoriesSchema();
    //require('./../models/User').loadUsersSchema();
    //require('./../models/Forum').loadForumSchema();
};