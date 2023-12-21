
const Joi = require("joi");
const { typeConstants } = require('./constants')

// const getKeysWithDoubleQuotes = (array, key) => {
//   return array.map(item => item[key])
// }


// const createSchema = (array) => {
//   const forOptions = getKeysWithDoubleQuotes(array, 'option')
//   const forValue = getKeysWithDoubleQuotes(array, 'value')
//   const forLabel = getKeysWithDoubleQuotes(array, 'label')
//   if (forOptions[0]) {
//     return Joi.object({
//       option: Joi.string().valid(...forOptions),
//       checked: Joi.boolean().valid(true),
//     })
//   } else {
//     return Joi.object({
//       value: Joi.string().valid(...forValue).required(),
//       label: Joi.string().valid(...forLabel).required(),
//     })
//   }
// }


function validationSchema(validations) {
  switch (validations?.validationType) {
    case typeConstants.text:
      if (validations.isRequired) {
        return Joi.string().min(validations.min).max(validations.max).required();
      } else
        return Joi.string().min(validations.min).max(validations.max);
    case typeConstants.number:
      if (validations.isRequired) {
        return Joi.number().min(validations.min).max(validations.max).required();
      } else
        return Joi.number().min(validations.min).max(validations.max);
    case typeConstants.onlyAlphabets:
      if (validations.isRequired) {
        return Joi.string().regex(/^[a-zA-Z]+$/).min(validations.min).max(validations.max).required();
      } else
        return Joi.string().regex(/^[a-zA-Z]+$/).min(validations.min).max(validations.max);
    case typeConstants.onlyAlphanumeric:
      if (validations.isRequired) {
        return Joi.string().alphanum().min(validations.min).max(validations.max).required();
      } else
        return Joi.string().alphanum().min(validations.min).max(validations.max);
    case typeConstants.specialCharacterAllowed:
      if (validations.isRequired) {
        return Joi.string().pattern(/^[a-zA-Z0-9@_$&-]+$/).min(validations.min).max(validations.max).required();
      } else
        return Joi.string().pattern(/^[a-zA-Z0-9@_$&-]+$/).max(validations.max);
    case typeConstants.pincode:
      if (validations.isRequired) {
        return Joi.string().min(6).max(6).required();
      } else
        return Joi.string().min(6).max(6);
    case typeConstants.phone:
      if (validations.isRequired) {
        return Joi.string().min(10).max(10).required();
      } else
        return Joi.string().min(10).max(10);
    case typeConstants.email:
      if (validations.isRequired) {
        return Joi.string().regex(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/).trim().lowercase().required();
      } else
        return Joi.string().regex(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/).trim().lowercase();
    case typeConstants.allowDecimal:
      if (validations.isRequired) {
        return Joi.number().precision(2).positive().required();
      } else
        return Joi.number().precision(2).positive();
    case typeConstants.onlyIntegerNumber:
      if (validations.isRequired) {
        return Joi.number().integer().positive().min(validations.min).max(validations.max).required();
      } else
        return Joi.number().integer().positive().min(validations.min).max(validations.max);
    case typeConstants.date:
      if (validations.isRequired) {
        return Joi.date().iso().required();
      } else
        return Joi.date().iso();
    case typeConstants.radio:
      if (validations.isRequired) {
        return Joi.object({
          option: Joi.string(),
          checked: Joi.boolean().valid(true),
        }).required();
      } else
        return Joi.object({
          option: Joi.string(),
          checked: Joi.boolean().valid(true),
        });
    case typeConstants.checkbox:
      if (validations.isRequired) {
        return Joi.array().items(Joi.object(
          { option: Joi.string(), checked: Joi.boolean() })).required();
      } else
        return Joi.array().items(Joi.object({
          option: Joi.string(),
          checked: Joi.boolean()
        }))
    case typeConstants.multiselect:
      if (validations.isRequired) {
        return Joi.array().items(Joi.object({
          value: Joi.string(),
          label: Joi.string()
        })).required();
      } else
        return Joi.array().items(Joi.object({
          value: Joi.string(),
          label: Joi.string(),
        }));
    case typeConstants.dropdown:
      if (validations.isRequired) {
        return Joi.object({
          value: Joi.string(),
          label: Joi.string(),
        }).required();
      } else
        return Joi.object({
          value: Joi.string(),
          label: Joi.string(),
        });

    default:
      return;
  }
}



let transformedObj = {}
const transformJson = (jsonObj) => {
  try {
    const { variable, validations } = jsonObj
    transformedObj[variable] = validationSchema(validations)
    return transformedObj;
  } catch (error) {
    console.log(error)
  }
}





exports.getJoiSchema = (data) => {
  try {
    const newSchema = data.map((field) => transformJson(field));
    const joiSchema = Joi.object(...newSchema)
    return joiSchema;
  } catch (error) {
    console.log(error);
  }
}



exports.testValidation = async (schema, obj) => {
  try {
    await schema.validate(obj);

  } catch (error) {
    console.log(error);
  }
}



