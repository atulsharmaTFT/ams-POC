const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { INTERNAL_SERVER_ERROR } = require("../constants");
const { connectDB } = require("../db");
const { adminSchema } = require("../models/admin.js");

const adminLogin = async (req, res, next) => {
  try {
    const { email, password, type, organizationId } = req.validatedBody;

    let db;

    if (type === "SUPERADMIN") {
      db = connectDB();
      const Admin = db.model("admins", adminSchema);
      const superAdmin = await Admin.findOne({ email, password });

      if (!superAdmin) {
        throw new ApiError(401, "Invalid Credentials");
      }

      await db.close();

      return res.status(200).json(new ApiResponse(200, superAdmin));
    } else {
      // db = connectDB(organizationId);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { adminLogin };
