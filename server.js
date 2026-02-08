
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

const PORT = 3000;

// disable buffering (important)
mongoose.set("bufferCommands", false);

// schema
const imageSchema = new mongoose.Schema(
  {
    imageUrl: String,
  },
  { collection: "images" } // ← EXACT name
);

const Image = mongoose.model("Images", imageSchema);

// routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/images", async (req, res) => {
  console.log("📸 /images route hit hua");
  const images = await Image.find();
  res.json(images);
});
 

// 🔴 CONNECT FIRST, SERVER AFTER
mongoose.connect(
  "mongodb+srv://pyash23cs_db_user:Password123@cluster0.jx6nlpj.mongodb.net/imageDB?authSource=admin"
)

  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
