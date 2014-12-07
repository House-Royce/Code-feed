var mongoose = require('mongoose');

module.exports.loadCommentsSchema = function () {
    var commentSchema = new mongoose.Schema({
        line: Number,
        votes: Number,
        text: String,
        createdOn: Date
    });

    var Comment = mongoose.model('comments', commentSchema);

    //var exampleComment = new Comment({
    //    line: 4,
    //    votes: 0,
    //    text: "You missed the semicolon!",
    //    createdOn: new Date
    //});
    //
    //exampleComment.save(function (err, result) {
    //    console.log(result);
    //});
};