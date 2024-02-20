const mongoose = require('mongoose')
const {model} = mongoose
const { Schema } = mongoose
const date = new Date();

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: String, default: date.now },
});
const user = model('user', userSchema);

module.exports = user
