const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

app.use(
  basicAuth({
    users: { user: "password" },
  }),
);

const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const noteRoutes = require("./routes/NoteRoutes");
app.use("/api", noteRoutes);

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

module.exports = { app, server };
