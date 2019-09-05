const express = require("express");
const router = express.Router();

// Get Post
// Public
router.get("/", (req, res) => {
  res.send("Post Test");
});

module.exports = router;
