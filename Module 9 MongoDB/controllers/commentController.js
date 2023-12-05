"use strict";
const Models = require("../models"); // Matches index.js

const addComment = (postId, commentData, res) => {
  // Check if the post exists
  Models.Post.findById(postId)
    .then((post) => {
      // Ensuring the post exists
      if (!post) {
        res.send({ status: 404, error: 'Post not found.' });
      } else {
        // Create a new comment
        new Models.Comment({ ...commentData, PostID: postId })
          .save()
          .then((comment) => {
            // Update the Post with the new comment
            return Models.Post.findByIdAndUpdate(
              postId,
              { $push: { Comments: comment._id } },
              { new: true, useFindAndModify: false }
            ).populate('Comments.UserID', 'username'); // Populating the comment with username of the user
          })
          .then((data) => res.send({ status: 200, data: data }))
          .catch((err) => {
            console.error(err);
            res.send({ status: 500, error: err.message });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({ status: 500, error: err.message });
    });
};

module.exports = {
  addComment,
};
