const express = require("express");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const authRoutes = require("./routes/api/auth");
const postRoutes = require("./routes/api/post");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
