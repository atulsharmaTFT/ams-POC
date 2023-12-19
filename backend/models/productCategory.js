const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variable: {
      type: String,
      required: true,
    },
    fieldGroups: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
  },
  { versionKey: false, timestamps: true, collection: "productCategories" }
);

const ProductCategory = mongoose.model("productCategories", productSchema);

module.exports = ProductCategory;
