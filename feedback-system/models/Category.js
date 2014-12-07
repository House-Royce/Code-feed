var mongoose = require('mongoose'),
    Question = require('./Question');

module.exports.loadCategoriesSchema = function () {
    var categorySchema = new mongoose.Schema({
        language: String,
        questions: [Question]
    });

    var Category = mongoose.model('categories', categorySchema);

    var javaCategory = new Category({
        language: 'Java',
        questions: []
    });

    javaCategory.save(function (err, result) {
        console.log(result);
    });
};