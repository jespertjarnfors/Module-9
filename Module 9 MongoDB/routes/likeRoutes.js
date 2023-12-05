const express = require("express");
const router = express.Router();
const Controllers = require("../controllers"); //index.js

// Like routes
router.post("/:postId/:userId", (req, res) => {
  const { postId, userId } = req.params;
  Controllers.likeController.likePost(postId, userId, res);
});

module.exports = router;
