const mongoose = require("mongoose");
const Note = require("./Note");

//Schema constructor ref
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});
ArticleSchema.pre("remove", function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  Note.remove({ article_id: this._id }).exec();
  next();
});

//Creates model for the schema above using mongoose
let Article = mongoose.model("Article", ArticleSchema);

//Export Article model
module.exports = Article;
