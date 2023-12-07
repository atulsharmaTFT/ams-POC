import * as Yup from "yup";

function transformJson(jsonObj) {
  const { variable, type, validations } = jsonObj;

  const transformedObj = {
    [variable]: validationSchema(type, validations),
  };

  return transformedObj;
}

export function validationSchema(type, validations) {
  switch (validations?.validationType) {
    case "string":
      if (validations.isRequired) {
        // if(minLength&&maxLength)
        return Yup.string()
          .required()
          .min(validations.minLength)
          .max(validations.maxLength);
      } else
        return Yup.string()
          .min(validations.minLength)
          .max(validations.maxLength);

      
    case "number":
      if (validations.isRequired) {
        return Yup.number()
          .required()
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
  const newSchema = data.fields.map((ele) => transformJson(ele));
  console.log(newSchema);
}
