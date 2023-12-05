const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true, // keeping it optional for now, but it will be needed in future
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Assets = mongoose.model("assets", assetsSchema);

module.exports = Assets;
