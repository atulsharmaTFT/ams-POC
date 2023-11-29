const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
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
      enum: [
        "text",
        "radio",
        "checkbox",
        "dropdown",
        "date",
        "toggle",
        "multiSelect",
        "slider",
        "number",
      ],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    checkboxOptions: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "checkbox" || value.length > 0;
        },
        message: 'checkboxOptions must be present when type is "checkbox"',
      },
    },
    radioOptions: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "radio" || value.length > 0;
        },
        message: 'radioOptions must be present when type is "radio"',
      },
    },
    dropdownOptions: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "dropdown" || value.length > 0;
        },
        message: 'dropdownOptions must be present when type is "dropdown"',
      },
    },
    dateOptions: {
      format: {
        type: String,
        enum: ["DD-MM-YYYY"],
        required: function () {
          return this.type === "date";
        },
      },
      minDate: {
        type: Date,
        required: function () {
          return this.type === "date";
        },
      },
      maxDate: {
        type: Date,
        required: function () {
          return this.type === "date";
        },
      },
    },
    toggleDefault: {
      type: Boolean,
      default: false,
    },
    multiSelectOptions: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "multiSelect" || value.length > 0;
        },
        message:
          'multiSelectOptions must be present when type is "multiSelect"',
      },
    },
    sliderOptions: {
      min: {
        type: Number,
        required: function () {
          return this.type === "slider";
        },
      },
      max: {
        type: Number,
        required: function () {
          return this.type === "slider";
        },
      },
      step: {
        type: Number,
        required: function () {
          return this.type === "slider";
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Fields = mongoose.model("fields", fieldSchema);

module.exports = Fields;
