const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const {
  getAllPosts,
  getPostById,
  getLatestPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const protectedRoute = require("../middleware/protectedRoute");

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Post routes
router.get("/posts", getAllPosts); // Get all posts
router.get("/latest-posts", getLatestPosts); // Get latest posts
router.get("/posts/:id", getPostById); // Get a post by ID
router.post("/create-posts", protectedRoute, createPost); // Create a new post
router.delete("/delete-posts/:id", protectedRoute, deletePost); // Delete a post
router.put("/update-posts/:id", protectedRoute, updatePost); // Update a post

module.exports = router;
