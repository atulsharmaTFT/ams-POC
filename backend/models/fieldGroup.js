const mongoose = require("mongoose");

const fieldGroupsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variable: {
      type: String,
      required: true,
    },
    fields: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
  },
  { versionKey: false, timestamps: true, collection: "fieldGroups" }
);

const FieldGroup = mongoose.model("fieldGroups", fieldGroupsSchema);

module.exports = FieldGroup;
