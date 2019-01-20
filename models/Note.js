const mongoose = require("mongoose");

//Schema constructor ref
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  text: {
    type: String
  }
});

//Creates model for the schema above using mongoose
const Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;
