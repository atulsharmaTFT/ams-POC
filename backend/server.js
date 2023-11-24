const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const Joi = require("joi");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/AMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
