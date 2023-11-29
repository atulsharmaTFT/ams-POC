const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Joi = require("joi");
const Fields = require("./schemas/fields");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/AMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const validateFields = Joi.object({
  name: Joi.string().required(),
  variable: Joi.string().required(),
  type: Joi.string()
    .valid(
      "text",
      "radio",
      "checkbox",
      "dropdown",
      "date",
      "toggle",
      "multiSelect",
      "slider",
      "number"
    )
    .required(),
  enabled: Joi.boolean().required(),
  required: Joi.boolean().required(),
  maxLength: Joi.number().default(0),
  minLength: Joi.number().default(0),
  description: Joi.string().default(""),
  radioOptions: Joi.array()
    .items(Joi.string())
    .default([])
    .when("type", {
      is: "radio",
      then: Joi.array().items(Joi.string().required()).min(1),
    }),
  checkboxDefault: Joi.boolean().default(false),
  dropdownOptions: Joi.array()
    .items(Joi.string())
    .default([])
    .when("type", {
      is: "dropdown",
      then: Joi.array().items(Joi.string().required()).min(1),
    }),
  dateOptions: Joi.object({
    format: Joi.string().valid("DD-MM-YYYY"),
    minDate: Joi.date().required(),
    maxDate: Joi.date().required(),
  }).when("type", {
    is: "date",
    then: Joi.object({
      format: Joi.string().valid("DD-MM-YYYY").required(),
      minDate: Joi.date().required(),
      maxDate: Joi.date().required(),
    }).required(),
  }),
  toggleDefault: Joi.boolean().default(false),
  multiSelectOptions: Joi.array()
    .items(Joi.string())
    .default([])
    .when("type", {
      is: "multiSelect",
      then: Joi.array().items(Joi.string().required()).min(1),
    }),
  sliderOptions: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
    step: Joi.number().required(),
  }).when("type", {
    is: "slider",
    then: Joi.object({
      min: Joi.number().required(),
      max: Joi.number().required(),
      step: Joi.number().required(),
    }).required(),
  }),
});

app.post("/fields", async (req, res) => {
  const { error, value } = validateFields.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const newField = new Fields(value);
    await newField.save();
    res.status(200).json(newField);
  }
});

// Start the server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
