import * as Yup from "yup";
import constants from "./constantKeyword/constants";
import messages from "./constantKeyword/messages";
import errors from "./constantKeyword/errors";

function transformJson(jsonObj) {
  try{
  const { variable, type, validations } = jsonObj;
  const transformedObj = {
    [variable]: validationSchema(type, validations),
  };
  return transformedObj;
}
catch(error){
  console.log(error, errors.errorTransformingJSON)
}
}

export function validationSchema(type,validations) {
  switch (validations?.validationType) {
    // Text Validation (Strings)
    case constants.onlyAlphabets:
      if (validations?.isRequired) {
      return Yup.string().required();
      }
      else return Yup.string();
    case constants.onlyAlphanumeric:
      if (validations?.isRequired) {
      return Yup.string().required();
    }
    else return Yup.string();
    case constants.pincode:
      if (validations?.isRequired) {
      return Yup.string().required();
    }
    else return Yup.string();
    case constants.phone:
      if (validations?.isRequired) {
      return Yup.string().required();
    }
    else return Yup.string();
    case constants.email:
      if (validations?.isRequired) {
      return Yup.string().required();
    }
    else return Yup.string();
    case constants.specialCharacterAllowed:
      if (validations?.isRequired) {
      return Yup.string().required();
    }
    else return Yup.string();

    case constants.string.toLowerCase():
      if (validations?.isRequired) {
        if(type === constants.string.toLowerCase() || type === constants.number.toLowerCase()){
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

    // Validation Numbers
    case constants.onlyIntegerNumber:
      if (validations?.isRequired) {
      return Yup.number().required();
    }
    else return Yup.number();
    case constants.allowDecimal:
      if (validations?.isRequired) {
      return Yup.number().required();
    }
    else Yup.number();
    break;
    case constants.number.toLowerCase():
      if (validations.isRequired) {
        if(type === constants.string.toLowerCase() || type === constants.number.toLowerCase()){
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
          break;
    //Dropdown and Radio validation
    case constants.dropdown.toLowerCase() || constants.radio.toLowerCase():
      if (validations?.isRequired)
        return Yup.object().required()
      else return Yup.object();
      break;
    // MultiSelect and ChcekBox validations
    case constants.multiselect.toLowerCase() || constants.checkbox.toLowerCase():
      if (validations?.isRequired) {
        return Yup.array()
          .required(messages.pleaseSelect)
          .min(1, messages.pleaseSelect);
      } else {
        return Yup.array();
      }
      break;
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
    console.log(error, errors.errorGeneratingSchema)
  }
}

export const staticSchema = {
  name: Yup.string()
    .required(messages.nameRequired)
    .min(2)
    .max(20)
    .label(constants.name),
  price: Yup.number()
    .required(messages.priceRequired)
    .test(messages.isPositive, messages.priceGreaterThanZero, (value) => value > 0)
    .label(constants.price),
  tag: Yup.string()
    .required(messages.tagNumberRequired)
    .min(2)
    .max(15)
    .label(constants.tagNumber),
  purchaseDate: Yup.date()
    // .required("Date is required")
    .min(new Date(1900, 0, 1))
    .label(constants.purchaseDate),
  image: Yup.string().notRequired().label(constants.image),
};