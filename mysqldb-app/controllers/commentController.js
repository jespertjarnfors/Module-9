"use strict";
const Models = require("../models");

const addComment = (postId, commentData, res) => {
  Models.Comment.create({ postId: postId, ...commentData })
    .then(() => {
      return Models.Post.findByPk(postId, { include: Models.Comment });
    })
    .then((updatedPost) => {
      res.send({ status: 200, data: updatedPost });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: 500, error: err.message });
    });
};

module.exports = {
  addComment,
};
