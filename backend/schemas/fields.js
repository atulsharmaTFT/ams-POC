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
      ],
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
      validate: {
        validator: function (value) {
          return this.type !== "radio" || value.length > 0;
        },
        message: 'radioOptions must be present when type is "radio"',
      },
    },
    checkboxLabel: {
      type: String,
      default: "",
      validate: {
        validator: function (value) {
          return this.type !== "checkbox" || value.trim().length > 0;
        },
        message: 'checkboxLabel must be present when type is "checkbox"',
      },
    },
    checkboxDefault: {
      type: Boolean,
      default: false,
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
        enum: ["YYYY-MM-DD", "DD-MM-YYYY"],
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
