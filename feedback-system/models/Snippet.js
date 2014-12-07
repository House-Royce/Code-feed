var mongoose = require('mongoose'),
    Comment = require('./Comment');
var exmpleComment = new Comment;

module.exports.loadSnippetsSchema = function () {
    var snippetSchema = new mongoose.Schema({
        version: Number,
        code: String,
        comments: [Comment]
    });

    var Snippet = mongoose.model('snippets', snippetSchema);

//ObjectId("5483955017fabb775e808ef2"

    // Totally messed up here:
    // Read this! http://mongoosejs.com/docs/subdocs.html#altsyntax

    //var javaCode = new Snippet({
    //    version: 1,
    //    code: "try (Scanner input = new Scanner(System.in)) {\r\n\r\n\t\t\tint rows = input.nextInt();\r\n\r\n\t\t\tdouble[] number = new double[rows];\r\n\t\t\tString[] type = new String[rows];\r\n\r\n\t\t\tfor (int i = 0; i < rows; i++) {\r\n\t\t\t\tnumber[i] = input.nextDouble();\r\n\t\t\t\ttype[i] = input.next();\r\n\t\t\t}\r\n\r\n\t\t\tfor (int i = 0; i < rows; i++) {\r\n\t\t\t\tconvert(number[i], type[i]);\r\n\t\t\t}\r\n\t\t}",
    //    comments: [comment]
    //});
    //
    //javaCode.save(function (err, result) {
    //    console.log(result);
    //});
};