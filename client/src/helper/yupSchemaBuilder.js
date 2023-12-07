import * as Yup from "yup";

function transformJson(jsonObj) {
  const { variable, type, validations } = jsonObj;

  const transformedObj = {
    [variable]: validationSchema(type, validations),
  };
  console.log(transformedObj);
  return transformedObj;
}

export function validationSchema(type, validations) {
  switch (validations?.validationType) {
    case "string":
      if (validations.isRequired) {
        // if(minLength&&maxLength)
        return Yup.string()
          .required("is required")
          .min(validations.minLength)
          .max(validations.maxLength);
      } else
        return Yup.string()
          .min(validations.minLength)
          .max(validations.maxLength);

    case "number":
      if (validations.isRequired) {
        return Yup.number()
          .required("is required")
          .min(validations.minLength)
          .max(validations.maxLength);
      } else
        return Yup.number()
          .min(validations.minLength)
          .max(validations.maxLength);

    default:
      return;
  }
}

export function getSchema(data) {
  const newSchema = Object.assign(
    {},
    ...data.fields.map((field) => transformJson(field))
  );
  return newSchema;
}
