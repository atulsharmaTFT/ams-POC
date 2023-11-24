const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  variable: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "radio"],
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  default: {
    type: String,
    default: "",
  },
  dateDefault: {
    type: Date,
    default: "2021-07-18T16:05:42.395Z",
  },
  numberDefault: {
    type: Number,
    default: 0,
  },
  booleanDefault: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: 0,
  },
  minLength: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  radioOptions: {
    type: [String],
    default: [],
  },
  selectOptions: {
    type: [String], // need updation
    default: [],
  },
  multiSelectOptions: {
    type: [String], // need updation
    default: [],
  },
});

const Fields = mongoose.model("fields", fieldSchema);

module.exports = Fields;
