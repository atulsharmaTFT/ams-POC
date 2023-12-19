
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




function validationSchema(type, validations, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions) {
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
    case "":
      if (validations.isRequired) {
        return Joi.number().min(validations.min).max(validations.max).required();
      } else
        return Joi.number().min(validations.min).max(validations.max);
    case "date":
      if (validations.isRequired) {
        return Joi.date().iso().min(validations.min).max(validate.max).required();
      } else
        return Joi.date().iso().min(validations.min).max(validations.max);
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
  const { variable, type, validations, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions } = jsonObj;
  transformedObj[variable] = validationSchema(type, validations, checkboxOptions, radioOptions, dropdownOptions, multiSelectOptions)
  return transformedObj;
}






exports.getJoiSchema = (data) => {
  const newSchema = data.map((field) => transformJson(field));
  const joiSchema = Joi.object(...newSchema)
  return joiSchema;
}



exports.testValidation = (schema, obj) => {
  const { error, value } = schema.validate(obj);
  console.log(error);
  if (error) return error
}



