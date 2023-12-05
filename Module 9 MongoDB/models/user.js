const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, trim: true},
  email: { type: String, trim: true, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("user", userSchema);
