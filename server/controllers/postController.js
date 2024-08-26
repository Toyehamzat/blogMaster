const { body, param, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get post by ID
const getPostById = [
  param("id").isMongoId().withMessage("Invalid post ID"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id).populate(
        "author",
        "username"
      );
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  },
];

// Get latest posts
const getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "username");
    res.status(200).json(latestPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest posts" });
  }
};

// Create a new post
const createPost = [
  async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  },
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("imageUrl").notEmpty().withMessage("Image URL is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, content, imageUrl } = req.body;
      const post = new Post({
        title,
        description,
        content,
        imageUrl,
        author: user._id,
      });
      await post.save();
      res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create post", details: error.message });
    }
  },
];

// Delete a post
const deletePost = [
  async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  },
  param("id").isMongoId().withMessage("Invalid post ID"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "Forbidden: You are not the author of this post" });
      }

      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      res
        .status(200)
        .json({ message: "Post and associated comments deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete post and associated comments" });
    }
  },
];

// Update a post
const updatePost = [
  async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  },
  param("id").isMongoId().withMessage("Invalid post ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("content").optional().notEmpty().withMessage("Content cannot be empty"),
  body("imageUrl")
    .optional()
    .notEmpty()
    .withMessage("Image URL cannot be empty"),
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "Forbidden: You are not the author of this post" });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  },
];

module.exports = {
  getAllPosts,
  getPostById,
  getLatestPosts,
  createPost,
  deletePost,
  updatePost,
};
