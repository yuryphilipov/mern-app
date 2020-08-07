const express = require("express");
const app = express();

const config = require("config");
const PORT = config.get("port") || 5000;

const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("<h1>MERN Stack!</h1>");
});

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log("Server started!");
    });
  } catch (e) {
    console.log("Server Error:", e.message);
    process.exit(1);
  }
}
start();
