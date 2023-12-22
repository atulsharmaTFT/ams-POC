const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    fieldGroupId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { _id: false }
);

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variable: {
      type: String,
      required: true,
    },
    indexedFieldGroupsIds: {
      type: [schema],
      require: true
    },
    fieldGroups: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
