const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// Register/create user
// Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password with atleast six characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(req.body);

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: "User already exists" });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // create salt for hashing - 10 rounds
      const salt = await bcrypt.genSalt(10);
      // assign password as now hashed password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;