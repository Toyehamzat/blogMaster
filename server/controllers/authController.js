const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

export const signup = [
  body("username", "username is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must consist of at least 3 characters")
    .escape()
    .notEmpty()
    .withMessage("Username can not be empty!"),
  body("email", "email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .escape()
    .notEmpty()
    .withMessage("email can not be empty!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must consist of at least 6 characters"),
  body("confirm_password")
    .trim()
    .escape()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be the same");
      }
    }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const existingUser = await User.findOne({ username: req.body.username });

      if (existingUser) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }

      const harshedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: harshedPassword,
      });

      await user.save();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    } finally {
      console.log("Signup function executed");
    }
  },
];
