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
    .transform((value) => (Number.isNaN(value) ? null : value))
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
    .required("Purchase Date is required")
    .label(constants.purchaseDate)
    .transform((curr, orig) => (orig === "" ? null : curr)),
  image: Yup.string().notRequired().label(constants.image),
};

export function validationSchema(type, validations) {
  let baseSchema;

  switch (validations.validationType) {
    // Other cases...

    case toCamelCase(constants.onlyAlphabets):
      baseSchema = Yup.string().matches(
        /^[a-zA-Z]+$/,
        "Only alphabets allowed"
      );
      break;
    case toCamelCase(constants.onlyAlphanumeric):
      baseSchema = Yup.string().matches(
        /^[a-zA-Z0-9]*$/,
        "Only alphanumeric characters allowed"
      );
      break;
    case constants.pincode.toLowerCase():
      baseSchema = Yup.string().matches(/^\d{6}$/, "Invalid PIN code");
      break;
    case constants.phone.toLowerCase():
      baseSchema = Yup.string()
        .min(10, "Phone no. must be 10 characters")
        .max(10, "Phone no. must be 10 characters")
        .matches(/^\d+$/, "Invalid phone number");
      break;
    case constants.email.toLowerCase():
      baseSchema = Yup.string()
        .email("Invalid email address")
        .trim()
        .lowercase();
      break;
    case toCamelCase(constants.specialCharacterAllowed):
      baseSchema = Yup.string().matches(
        /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/,
        "Special characters are allowed"
      );
      break;
    case constants.text.toLowerCase():
      baseSchema = Yup.string();
      break;
    case constants.number.toLowerCase():
      baseSchema = Yup.number();
      break;
    case toCamelCase(constants.onlyIntegerNumber):
      baseSchema = Yup.number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .integer("Only Integer is allowed")
        .positive("Only Positive Integer Allowed");

      break;
    case toCamelCase(constants.allowDecimal):
      baseSchema = Yup.number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .positive("Positive Decimal no. allowed");
      break;

    case constants.radio.toLowerCase():
      baseSchema = Yup.object();

      if (validations?.isRequired) {
        baseSchema = baseSchema.required("Please Select Atleast One Option");
      }
      return baseSchema;

    case constants.dropdown.toLowerCase():
      baseSchema = Yup.object();

      if (validations?.isRequired) {
        baseSchema = baseSchema.required("Please Select Atleast One Option");
      }
      return baseSchema;
    case constants.multiselect.toLowerCase():
      baseSchema = Yup.array();

      if (validations?.isRequired) {
        baseSchema = baseSchema
          .required("Select at least one option.")
          .min(1, "At least one option must be selected")
          .of(
            Yup.object().shape({
              label: Yup.string().required("Select at least one option."),
              value: Yup.string().required("Select at least one option."),
            })
          );
      }
      return baseSchema;
    case constants.checkbox.toLowerCase():
      baseSchema = Yup.array();
      if (validations.isRequired) {
        baseSchema = baseSchema
          .min(1, `Select at least one options`)
          .of(
            Yup.object({
              option: Yup.string().required(),
              checked: Yup.boolean(),
            })
          )
          .test(
            "atLeastOneChecked",
            "At least one option must be selected",
            (options) => options.some((option) => option.checked === true)
          );
      }
      return baseSchema;
    case constants.date.toLowerCase():
      baseSchema = Yup.date().transform((curr, orig) =>
        orig === "" ? null : curr
      );
      if (validations.isRequired) {
        baseSchema = baseSchema.required("Date is required");
      }
      return baseSchema;

    // Add other cases...

    default:
      return;
  }

  if (validations) {
    // Add 'required' validation
    if (validations.isRequired) {
      baseSchema = baseSchema.required("This field is required !");
    }

    if (!validations.isRequired) {
      baseSchema = baseSchema
        .nullable()
        .transform((value) => (value === "" ? null : value));
    }
    // Add 'min' validation
    if (validations.min !== undefined) {
      baseSchema = baseSchema.min(
        validations.min,
        `Must be greater than ${validations.min}`
      );
    }

    // Add 'max' validation
    if (validations.max !== undefined) {
      baseSchema = baseSchema.max(
        validations.max,
        `Must be less than ${validations.max}`
      );
    }
  }

  return baseSchema;
}