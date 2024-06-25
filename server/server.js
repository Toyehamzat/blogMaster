// server.js

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());

const PORT = process.env.PORT || 5000;
const uri = process.env.DATABASEURI;

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

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Start the server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
