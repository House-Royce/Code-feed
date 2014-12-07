var mongoose = require('mongoose'),
    Snippet = require('./Snippet');

module.exports.loadQuestionsSchema = function () {
    var questionSchema = new mongoose.Schema({
        title: String,
        author: Object,
        text: String,
        votes: Number,
        createdOn: Date,
        updatedOn: Date,
        tags: [String],
        solved: Boolean,
        codeVersions: [Snippet]
    });

    var Question = mongoose.model('questions', questionSchema);

    //var stupidQuestion = new Question({
    //    language: 'Java',
    //    questions: []
    //});
    //
    //stupidQuestion.save(function (err, result) {
    //    console.log(result);
    //});
};