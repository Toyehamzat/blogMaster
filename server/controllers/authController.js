const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const rateLimit = require("express-rate-limit");
const passport = require("passport");

// Load environment variables
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// In-memory token storage (replace with a database in production)
const tokenStorage = new Map();

// Rate limiting setup
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

const signup = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must include one lowercase character, one uppercase character, a number, and a special character"
    ),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
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

      // Check for existing username or email
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({
          error: "Username or email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

const login = [
  // loginLimiter,
  body("username")
    .trim()
    .isLength({ min: 3 })

    .escape()
    .withMessage("Username must consist of at least 3 characters"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must consist of at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info.message || "Unauthorized" });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        {
          sub: user._id,
          username: user.username,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "1d" } // Token expires in 1 day
      );
      res.status(200).json({
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];
const logout = async (req, res) => {
  console.log("user logged out");
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const storedToken = tokenStorage.get(decoded.userId.toString());

    if (storedToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

module.exports = { signup, login, logout, refreshToken };
