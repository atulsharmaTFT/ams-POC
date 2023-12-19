
const Joi = require("joi");


const getKeysWithDoubleQuotes = (array, key) => {
  return array.map(item => item[key])
}


const createSchema = (array) => {
  const forOptions = getKeysWithDoubleQuotes(array, 'option')
  const forValue = getKeysWithDoubleQuotes(array, 'value')
  const forLabel = getKeysWithDoubleQuotes(array, 'label')
  if (forOptions[0]) {
    return Joi.object({
      option: Joi.string().valid(...forOptions),
      checked: Joi.boolean().valid(true),
    })
  } else {
    return Joi.object({
      value: Joi.string().valid(...forValue).required(),
      label: Joi.string().valid(...forLabel).required(),
    })
  }
}


function validationSchema(type, validations, dateOptions, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions) {
  switch (validations?.validationType) {
    case "string":
      if (validations.isRequired) {
        return Joi.string().min(validations.min).max(validations.max).required();
      } else
        return Joi.string().min(validations.min).max(validations.max);
    case "number":
      if (validations.isRequired) {
        return Joi.number().min(validations.min).max(validations.max).required();
      } else
        return Joi.number().min(validations.min).max(validations.max);
    case "onlyAlphabets":
      if (validations.isRequired) {
        return Joi.string().regex(/^[a-zA-Z]+$/).min(validations.min).max(validations.max).required();
      } else
        return Joi.string().regex(/^[a-zA-Z]+$/).min(validations.min).max(validations.max);
    case "onlyAlphaNumeric":
      if (validations.isRequired) {
        return Joi.string().alphanum().min(validations.min).max(validations.max).required();
      } else
        return Joi.string().alphanum().min(validations.min).max(validations.max);
    case "specialCharactersAllowed":
      if (validations.isRequired) {
        return Joi.string().pattern(/^[a-zA-Z0-9@_$&-]+$/).min(validations.min).max(validations.max).required();
      } else
        return Joi.string().pattern(/^[a-zA-Z0-9@_$&-]+$/).max(validations.max);
    case "pincode":
      if (validations.isRequired) {
        return Joi.string().min(6).max(6).required();
      } else
        return Joi.string().min(6).max(6);
    case "phone":
      if (validations.isRequired) {
        return Joi.string().min(10).max(10).required();
      } else
        return Joi.string().min(10).max(10);
    case "email":
      if (validations.isRequired) {
        return Joi.string().regex(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/).trim().lowercase().required();
      } else
        return Joi.string().regex(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/).trim().lowercase();
    case "allowDecimalPoints":
      if (validations.isRequired) {
        return Joi.number().precision(2).positive().required();
      } else
        return Joi.number().precision(2).positive();
    case "onlyIntegerNumbers":
      if (validations.isRequired) {
        return Joi.number().integer().positive().min(validations.min).max(validations.max).required();
      } else
        return Joi.number().integer().positive().min(validations.min).max(validations.max);
    case "date":
      if (validations.isRequired) {
        return Joi.date().iso().required();
      } else
        return Joi.date().iso();
    case "radio":
      if (validations.isRequired) {
        return createSchema(radioOptions).required();
      } else
        return createSchema(radioOptions);
    case "checkbox":
      if (validations.isRequired) {
        return Joi.array().items(createSchema(checkboxOptions)).required();
      } else
        return Joi.array().items(createSchema(checkboxOptions));
    case "multiSelect":
      if (validations.isRequired) {
        return Joi.array().items(createSchema(multiSelectOptions)).required();
      } else
        return Joi.array().items(createSchema(multiSelectOptions));
    case "dropdown":
      if (validations.isRequired) {
        return createSchema(dropdownOptions).required();
      } else
        return createSchema(dropdownOptions);

    default:
      return;
  }
}



let transformedObj = {}
const transformJson = (jsonObj) => {
  const { variable, type, validations, dateOptions, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions } = jsonObj;
  transformedObj[variable] = validationSchema(type, validations, dateOptions, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions)
  return transformedObj;
}






exports.getJoiSchema = (data) => {
  const newSchema = data.map((field) => transformJson(field));
  const joiSchema = Joi.object(...newSchema)
  return joiSchema;
}



exports.testValidation = (schema, obj) => {
  const { error, value } = schema.validate(obj);
  if (error) return error
}



