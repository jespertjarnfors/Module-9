"use strict";
const Models = require("../models");

const likePost = (postId, userId, res) => {

  Models.Like.findOne({ where: { PostId: postId, UserId: userId } })
  
    .then((existingLike) => {
      if (existingLike) {
        res.send({ status: 400, error: 'User has already liked this post.' });
      } else {
        Models.Like.create({ postId: postId, userId: userId })
          .then((like) => {
            return Models.Post.findByPk(postId, { include: Models.Like });
          })
          .then((updatedPost) => {
            res.send({ status: 200, data: updatedPost });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({ status: 500, error: err.message });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: 500, error: err.message });
    });
};

module.exports = {
  likePost,
};
