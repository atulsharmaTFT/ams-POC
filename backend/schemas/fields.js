const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema(
  {
    validationType: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },
  { _id: false }
);

const options1 = new mongoose.Schema(
  {
    option: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const options2 = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const fieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variable: {
      type: String,
      required: true,
      unique: true,
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
    validations: {
      type: validationSchema,
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
      type: [options1],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "checkbox" || value.length > 0;
        },
        message: 'checkboxOptions must be present when type is "checkbox"',
      },
    },
    radioOptions: {
      type: [options1],
      default: [],
      validate: {
        validator: function (value) {
          return this.type !== "radio" || value.length > 0;
        },
        message: 'radioOptions must be present when type is "radio"',
      },
    },
    dropdownOptions: {
      type: [options2],
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
        enum: ["YYYY-MM-DD"],
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
      type: [options2],
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
