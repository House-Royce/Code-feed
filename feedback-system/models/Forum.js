var mongoose = require('mongoose'),
    Category = require('../models/Category'),
    User = require('../models/User');

module.exports.loadForumSchema = function () {
    var forumSchema = new mongoose.Schema({
        categories: [Category],
        users: [User]
    });

    var Forum = mongoose.model('forum', forumSchema);
};