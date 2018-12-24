const mongoose = require("mongoose");

//Schema constructor ref
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//Creates model for the schema above using mongoose
const Article = mongoose.model("Article", ArticleSchema);

//Export Article model
module.exports = Article;
