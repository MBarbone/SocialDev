const express = require("express");
require("dotenv").config();

const connectDB = require("./db/db");
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

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
