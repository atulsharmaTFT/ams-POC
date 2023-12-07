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
    ...data?.fields.map((field) => transformJson(field))
  );
  return newSchema;
}

export const staticSchema = {
  staticName: Yup.string().required("Name is required").min(2).max(20).label("Name"),
  staticPrice: Yup.number().required("Price is required").test(
    'Is positive?', 
    'Price must be greater than 0!', 
    (value) => value > 0
  ).label("Price"),
  staticTag: Yup.string().required("Tag number is required").min(2).max(15).label("Tag number"),
  staticPurchaseDate: Yup.date().required("Date is required").min(new Date(1900, 0, 1)).label("Purchase Date"),
  staticImage: Yup.string().notRequired().label("Image"),
};
