const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.type === "ORGADMIN";
      },
    },
    type: {
      type: String,
      required: true,
      enum: ["SUPERADMIN", "ORGADMIN"],
    },
    password: {
      type: String,
      required: function () {
        return this.type === "SUPERADMIN";
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Admin = mongoose.model("admins", adminSchema);

module.exports = { Admin, adminSchema };
