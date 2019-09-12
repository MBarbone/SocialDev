require("dotenv").config();
const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const authRoutes = require("./routes/api/auth");
const postRoutes = require("./routes/api/post");

const app = express();

// connect MongoDB
connectDB();

// Init Body Parser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
