const Joi = require("joi");
const { ApiError } = require("../utils/ApiError");

const validateAdminLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    organizationId: Joi.string().when("type", {
      is: "ORGADMIN",
      then: Joi.string().trim().min(1).required(),
      otherwise: Joi.string().optional(),
    }),
    type: Joi.string().valid("SUPERADMIN", "ORGADMIN").required(),
    password: Joi.string().trim().min(1).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  req.validatedBody = value;
  next();
};

module.exports = { validateAdminLogin };
