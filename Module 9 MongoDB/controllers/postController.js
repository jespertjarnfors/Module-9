"use strict";
const Models = require("../models"); // Matches index.js

const getPosts = (res) => {

  Models.Post.find({})
    .populate({
      path: 'Likes',
      populate: {
        path: 'UserID',
        select: 'username', // Retrieving the username of the user who liked the post
      },
    })
    .populate({
      path: 'Comments',
      populate: {
        path: 'UserID',
        select: 'username',
      },
    })
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.send({ status: 500, error: err.message });
    });
};

const createPost = (data, res) => {
  console.log(data);
  new Models.Post(data)
    .save()
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.send({ status: 500, error: err.message });
    });
};

const likePost = (postId, userId, res) => {

  Models.Post.findByIdAndUpdate(
    postId,
    { $addToSet: { Likes: userId } },
    { new: true, useFindAndModify: false }
  )
    .populate('Likes')
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.send({ status: 500, error: err.message });
    });
};

const addComment = (postId, commentData, res) => {
    
  Models.Post.findByIdAndUpdate(
    postId,
    { $push: { Comments: commentData } },
    { new: true, useFindAndModify: false }
  )
    .populate('Comments.UserID', 'username') // Assuming you want to retrieve only the username of the user who commented
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.send({ status: 500, error: err.message });
    });
};

module.exports = {
  getPosts,
  createPost,
  likePost,
  addComment,
};
