const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  Text: { type: String, required: true },
  UserID: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  PostID: { type: Schema.Types.ObjectId, ref: 'post', required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
