import * as Yup from "yup";

function transformJson(jsonObj) {
  try{
  const { variable, type, validations } = jsonObj;
  const transformedObj = {
    [variable]: validationSchema(type, validations),
  };
  return transformedObj;
}
catch(error){
  console.log(error, "Error Transforming JSON")
}
}

export function validationSchema(type,validations) {
  switch (validations?.validationType) {
    case "string":
      if (validations?.isRequired) {
        if(type === "string" || type === "number"){
          return Yup.string()
            .required()
            .min(validations?.minLength)
            .max(validations?.maxLength);
        }
        else return Yup.string().required()
      } else
        return Yup.string()
          .min(validations?.minLength)
          .max(validations?.maxLength );

    case "number":
      if (validations.isRequired) {
        if(type === "string" || type === "number"){
          return Yup.string()
            .required()
            .min(validations?.minLength)
            .max(validations?.maxLength);
        }
        else return Yup.string().required()
      } else
        return Yup.number()
          .min(validations.minLength)
          .max(validations.maxLength);
    case "dropdown" || "radio":
      if (validations?.isRequired)
        return Yup.object().required()
      else return Yup.string();
    case "multiselect":
      if (validations?.isRequired) {
        return Yup.array()
          .required("Please select at least one option")
          .min(1, "Please select at least one option");
      } else {
        return Yup.array();
      }

    default:
      return;
  }
}

export function getSchema(data) {
  try{
  const newSchema = Object.assign(
    ...data?.map((field) => transformJson(field))
  );
  return newSchema;
  }
  catch(error){
    console.log(error, "error generating Schema")
  }
}

export const staticSchema = {
  name: Yup.string()
    .required("Name is required")
    .min(2)
    .max(20)
    .label("Name"),
  price: Yup.number()
    .required("Price is required")
    .test("Is positive?", "Price must be greater than 0!", (value) => value > 0)
    .label("Price"),
  tag: Yup.string()
    .required("Tag number is required")
    .min(2)
    .max(15)
    .label("Tag number"),
  purchaseDate: Yup.date()
    .required("Date is required")
    .min(new Date(1900, 0, 1))
    .label("Purchase Date"),
  image: Yup.string().notRequired().label("Image"),
};
