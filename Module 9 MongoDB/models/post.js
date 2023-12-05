const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String },
  Image: { type: String }, // Assuming the image is stored as a URL or file path
  UserID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  Likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
  Comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
