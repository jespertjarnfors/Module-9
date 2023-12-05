"use strict";
const Models = require("../models"); // Matches index.js

const likePost = (postId, userId, res) => {
  // Check if the like already exists for this user and post
  Models.Like.findOne({ PostID: postId, UserID: userId })
    .then((existingLike) => {
      if (existingLike) {
        res.send({ status: 400, error: 'User has already liked this post.' });
      } else {
        // If the like doesn't exist, create a new like
        new Models.Like({ PostID: postId, UserID: userId })
          .save()
          .then((like) => {
            // Update the Post with the new like and populate 'Likes'
            return Models.Post.findByIdAndUpdate(
              postId,
              { $addToSet: { Likes: like._id } },
              { new: true, useFindAndModify: false }
            ).populate('Likes');
          })
          .then((updatedPost) => {
            // Send the response with the updated post
            res.send({ status: 200, data: updatedPost });
          })
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
  likePost
};
