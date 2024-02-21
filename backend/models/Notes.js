const mongoose = require("mongoose");
const date = new Date();
const { model } = mongoose;
const { Schema } = mongoose;
const dateParser = (obj) => {

 
  rawdate = String(new Date(obj));
  return rawdate.slice(0,24);
};

const noteSchema = new Schema({
  // making a foreign key to make a connection between the user: will make sure that each note will also have a user id of the person who have created this note
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  // remaining entries to your model
  title: { type: String, required: true },
  body: { type: String, required: true },
  tag: { type: String, required: true },
  date: { type: String, default: () => dateParser(Date.now()) }, // Capital date will be used here
});
const notes = mongoose.model("notes", noteSchema);

module.exports = notes; //should me module .exports
