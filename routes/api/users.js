const express = require("express");
const router = express.Router();

// Get User
// Public
router.get("/", (req, res) => {
  res.send("User Test");
});

module.exports = router;
