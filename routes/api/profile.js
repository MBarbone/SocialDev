const express = require("express");
const router = express.Router();

// Get Profile
// Public
router.get("/", (req, res) => {
  res.send("Profile Test");
});

module.exports = router;
