import * as Yup from "yup";
import constants from "./constantKeyword/constants";
import messages from "./constantKeyword/messages";
import errors from "./constantKeyword/errors";
import { toCamelCase } from "./commonHelpers";

function transformJson(jsonObj) {
  try {
    const { variable, type, validations } = jsonObj;
    const transformedObj = {
      [variable]: validationSchema(type, validations),
    };
    return transformedObj;
  } catch (error) {
    console.log(error, errors.errorTransformingJSON);
  }
}

export function validationSchema(type, validations) {
  switch (validations?.validationType) {
    // Text Validation (Strings)
    case toCamelCase(constants.onlyAlphabets):
      if (validations?.isRequired) {
        return Yup.string()
          .matches(/^[a-zA-Z]+$/, "Only alphabets allowed")
          .required("OnlyAlphabet is required !");
      } else
        return Yup.string().matches(/^[a-zA-Z]+$/, "Only alphabets allowed");
    case toCamelCase(constants.onlyAlphanumeric):
      if (validations?.isRequired) {
        return Yup.string()
          .matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")
          .required("OnlyAlphaNumeric is required !");
      } else
        return Yup.string().matches(
          /^[a-zA-Z0-9]*$/,
          "Only alphanumeric characters allowed"
        );
    case constants.pincode.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string()
          .matches(/^\d{6}$/, "Invalid PIN code")
          .required("PinCode is required !");
      } else return Yup.string().min(6).max(6);

    case constants.phone.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string().min(10).max(10).required("Phone no. is required !");
      } else return Yup.string().min(10).max(10);
    case constants.email.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string()
          .email("Invalid email address")
          .trim()
          .lowercase()
          .required("Email is required !");
      } else
        return Yup.string.email("Invalid email address").trim().lowercase();
    case toCamelCase(constants.specialCharacterAllowed):
      if (validations?.isRequired) {
        return Yup.string()
          .matches(/^[a-zA-Z0-9@_$&-]+$/, "Special characters are allowed")
          .required("Only SpecialCharacter is required !");
      } else
        return Yup.string().matches(
          /^[a-zA-Z0-9@_$&-]+$/,
          "Special characters are allowed"
        );

    case constants.string.toLowerCase():
      if (validations?.isRequired) {
        if (
          type === constants.string.toLowerCase() ||
          type === constants.number.toLowerCase()
        ) {
          return Yup.string()
            .required()
            .min(validations?.min)
            .max(validations?.max);
        } else return Yup.string().required();
      } else
        return Yup.string()
          .min(validations?.min)
          .max(validations?.max);

    // Validation Numbers
    case toCamelCase(constants.onlyIntegerNumber):
      if (validations?.isRequired) {
        return Yup.number()
          .integer()
          .positive("Only Positive Integer Allowed")
          .required("Postive Integer is required")
          .min(validations?.min)
          .max(validations?.max);
      } else
        return Yup.number()
          .integer()
          .positive("Only Positive Integer Allowed")
          .min(validations?.min)
          .max(validations?.max);
    case toCamelCase(constants.allowDecimal):
      if (validations?.isRequired) {
        return Yup.number()

          .positive("Positive Decimal allowed")
          .required("This field is required !")
          .min(validations?.min)
          .max(validations?.max);
      } else
        Yup.number()

          .positive("Positive Decimal allowed")
          .min(validations?.min)
          .max(validations?.max);
      break;
    case constants.number.toLowerCase():
      if (validations.isRequired) {
        if (
          type === constants.string.toLowerCase() ||
          type === constants.number.toLowerCase()
        ) {
          return Yup.string()
            .required()
            .min(validations?.min)
            .max(validations?.max);
        } else return Yup.string().required();
      } else
        return Yup.number()
          .min(validations.min)
          .max(validations.max);
      break;
    //Dropdown and Radio validation
    case constants.radio.toLowerCase():
      if (validations?.isRequired)
        return Yup.object().required("Please Select Atleast One Option");
      else return Yup.object();

    //DropDown
    case constants.dropdown.toLowerCase():
      if (validations?.isRequired)
        return Yup.object().required("Please Select Atleast One Option");
      else return Yup.object();

    // MultiSelect
    case constants.multiselect.toLowerCase():
      if (validations?.isRequired) {
        return Yup.array()
          .of(
            Yup.object().shape({
              label: Yup.string().required("Select at least one option."),
              value: Yup.string().required("Select at least one option."),
            })
          )
          .required("Select at least one option.");
      } else {
        return Yup.array();
      }

    //Checkbox
    case constants.checkbox.toLowerCase():
      if (validations?.isRequired) {
        return Yup.array()
          .of(
            Yup.object({
              option: Yup.string().required(),
              checked: Yup.boolean(),
            })
          )
          .min(1, "At least one option must be selected")
          .test(
            "atLeastOneChecked",
            "At least one option must be selected",
            (options) => options.some((option) => option.checked === true)
          );
      } else {
        return Yup.array();
      }
      case constants.date.toLowerCase():
        if (validations?.isRequired) {
        return Yup.date().required('Date is required')
        }
        else return Yup.date().nullable()
    default:
      return;
  }
}

export function getSchema(data) {
  try {
    const newSchema = Object.assign(
      ...data?.map((field) => transformJson(field))
    );
    return newSchema;
  } catch (error) {
    console.log(error, errors.errorGeneratingSchema);
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
    .test(
      messages.isPositive,
      messages.priceGreaterThanZero,
      (value) => value > 0
    )
    .label(constants.price),
  tag: Yup.string()
    .required(messages.tagNumberRequired)
    .min(2)
    .max(15)
    .label(constants.tagNumber),
  purchaseDate: Yup.date()
    .required("Date is required")
    .label(constants.purchaseDate),
  image: Yup.string().notRequired().label(constants.image),
};
