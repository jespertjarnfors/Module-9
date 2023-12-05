const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  UserID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  PostID: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

module.exports = mongoose.model("like", likeSchema);
