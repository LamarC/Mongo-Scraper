const mongoose = require("mongoose");

//Schema constructor ref
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
  title: String,
  body: String
});

//Creates model for the schema above using mongoose
const Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;