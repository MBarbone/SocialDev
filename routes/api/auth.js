const express = require("express");
const router = express.Router();

// Get Auth
// Public
router.get("/", (req, res) => {
  res.send("Auth Test");
});

module.exports = router;
