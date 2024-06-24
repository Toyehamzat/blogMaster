// server.js

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
// Test route
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to BlogMaster API");
});

// Sample blog posts route
app.get("/api/posts", (req, res) => {
  const samplePosts = [
    { id: 1, title: "First Post", content: "This is the first post" },
    { id: 2, title: "Second Post", content: "This is the second post" },
  ];
  res.json(samplePosts);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
