'use strict'
const User = require('./user') //require the models
const Post = require('./post')
const Comment = require('./comment')
const Like = require('./like')
const DogBreed = require('./dogBreed')

// Defining associations
Like.belongsTo(User, { foreignKey: 'userId' }); // A like belongs to a user
Like.belongsTo(Post, { foreignKey: 'postId' }); // A like belongs to a post

Post.belongsTo(User, { foreignKey: 'userId' }); // A post belongs to a user
Post.hasMany(Like, { foreignKey: 'postId' }); // A post can have multiple likes
Post.hasMany(Comment, { foreignKey: 'postId' }); // A post can have multiple comments

User.hasMany(Post, {foreignKey: 'userId'}); // A user can have multiple posts
User.hasMany(Like, {foreignKey: 'userId'}); // A user can have multiple likes
User.hasMany(Comment, {foreignKey: 'userId'}); // A user can have multiple comments

Comment.belongsTo(User, { foreignKey: 'userId' }); // A comment belongs to a user
Comment.belongsTo(Post, { foreignKey: 'postId' }); // A comment belongs to a post

async function init() {
 await User.sync(); //sync the model
 await Post.sync();
 await Comment.sync();
 await Like.sync();
 await DogBreed.sync();
};

init();
module.exports = {
 User, Post, Comment, Like, DogBreed
};
