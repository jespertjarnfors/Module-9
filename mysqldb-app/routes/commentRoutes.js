const express = require("express");
const router = express.Router();
const Controllers = require("../controllers"); //index.js

// Comment routes
router.post("/:postId", (req, res) => {
  const postId = req.params.postId;
  Controllers.commentController.addComment(postId, req.body, res);
});

module.exports = router;
