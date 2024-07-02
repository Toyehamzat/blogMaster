const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
// In-memory token blacklist (use Redis or a database in production)
let tokenBlacklist = [];

const signup = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must consist of at least 3 characters")
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty!"),
  body("email", "Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .escape()
    .notEmpty()
    .withMessage("Email cannot be empty!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must consist of at least 6 characters"),
  body("confirm_password")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be the same");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          errors: [{ param: "username", message: "user already exists!" }],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      res
        .status(201)
        .json({ message: "Sign up successful, Log in to continue" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
];

const login = [
  body("username", "username is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must consist of at least 3 characters")
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must consist of at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({
          errors: [
            { param: "username", message: "Invalid username or password" },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            { param: "password", message: "Invalid username or password" },
          ],
        });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
];

const logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    tokenBlacklist.push(token);
  }
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { signup, login, logout };
