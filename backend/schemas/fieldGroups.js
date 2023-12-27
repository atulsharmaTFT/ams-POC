const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    fieldId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { _id: false }
);


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
    indexedFieldsIds: {
      type: [schema],
      require: true
    },
    fields: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
  },
  { versionKey: false, timestamps: true, collection: "fieldGroups" }
);

const FieldGroups = mongoose.model("fieldGroups", fieldGroupsSchema);

module.exports = FieldGroups;
