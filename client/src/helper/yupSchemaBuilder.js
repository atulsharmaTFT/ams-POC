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
          .required("This field is required !")
          .matches(/^[a-zA-Z]+$/, "Only alphabets allowed")

          .min(
            validations?.min,
            `Alphabet must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `Alphabet must be less than ${validations?.max} letters`
          );
      } else
        return Yup.string()
          .matches(/^[a-zA-Z]+$/, "Only alphabets allowed")
          .min(
            validations?.min,
            `Alphabet must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `Alphabet must be less than ${validations?.max} letters`
          );
    case toCamelCase(constants.onlyAlphanumeric):
      if (validations?.isRequired) {
        return Yup.string()
          .required("This field is required !")
          .matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")

          .min(
            validations?.min,
            `AlphaNumeric must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `AlphaNumeric must be less than ${validations?.max} letters`
          );
      } else
        return Yup.string()
          .min(
            validations?.min,
            `AlphaNumeric must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `AlphaNumeric must be less than ${validations?.max} letters`
          )
          .matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed");
    case constants.pincode.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string()
          .required("PinCode is required !")
          .matches(/^\d{6}$/, "Invalid PIN code");
      } else return Yup.string().matches(/^\d{6}$/, "Invalid PIN code");

    case constants.phone.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string()
          .required("Phone no. is required !")
          .min(10, "Phone no. must be 10 character")
          .max(10, "Phone no. must be 10 character");
      } else
        return Yup.string()
          .min(10, "Phone no. must be 10 character")
          .max(10, "Phone no. must be 10 character");
    case constants.email.toLowerCase():
      if (validations?.isRequired) {
        return Yup.string()
          .required("Email is required !")
          .email("Invalid email address")
          .trim()
          .lowercase();
      } else
        return Yup.string().email("Invalid email address").trim().lowercase();
    case toCamelCase(constants.specialCharacterAllowed):
      if (validations?.isRequired) {
        return Yup.string()
          .required("This field is required !")
          .matches(/^[a-zA-Z0-9@_$&-]+$/, "Special characters are allowed")

          .min(
            validations?.min,
            `Must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `Must be less than ${validations?.max} letters`
          );
      } else
        return Yup.string()
          .matches(/^[a-zA-Z0-9@_$&-]+$/, "Special characters are allowed")
          .min(
            validations?.min,
            `Must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `Must be less than ${validations?.max} letters`
          );

    case constants.text.toLowerCase():
      if (validations?.isRequired) {
        if (
          type === constants.string.toLowerCase() ||
          type === constants.number.toLowerCase()
        ) {
          return Yup.string()
            .required("This field is required !")
            .min(
              validations?.min,
              `Must be greater than ${validations?.min} letters`
            )
            .max(
              validations?.max,
              `Must be less than ${validations?.min} letters`
            );
        } else return Yup.string().required("This field is required");
      } else
        return Yup.string()
          .min(
            validations?.min,
            `Must be greater than ${validations?.min} letters`
          )
          .max(
            validations?.max,
            `Must be less than ${validations?.min} letters`
          );

    // Validation Numbers
    case toCamelCase(constants.onlyIntegerNumber):
      if (validations?.isRequired) {
        return Yup.number()
          .required("This field is required !")
          .transform((value) => (Number.isNaN(value) ? null : value))
          .integer("Only Integer is allowed")
          .positive("Only Positive Integer Allowed")

          .min(validations?.min, `Must be greater than ${validations?.min}`)
          .max(validations?.max, `Must be less than ${validations?.max}`);
      } else
        return Yup.number()

          .integer("Only Integer is allowed")
          .positive("Only Positive Integer Allowed")
          .min(validations?.min, `Must be greater than ${validations?.min}`)
          .max(validations?.max, `Must be less than ${validations?.max}`)
          .nullable(true)
          .transform((_, val) => (val !== "" ? Number(val) : null));
    case toCamelCase(constants.allowDecimal):
      if (validations?.isRequired) {
        return Yup.number()
          .required("This field is required !")
          .transform((value) => (Number.isNaN(value) ? null : value))
          .positive("Positive Decimal no. allowed")

          .min(validations?.min, `Must be greater than ${validations?.min}`)
          .max(validations?.max, `Must be less than ${validations?.max}`);
      } else
        Yup.number()

          .positive("Positive Decimal no. allowed")
          .min(validations?.min, `Must be greater than ${validations?.min}`)
          .max(validations?.max, `Must be less than ${validations?.max}`);
      break;
    case constants.number.toLowerCase():
      if (validations.isRequired) {
        if (
          type === constants.string.toLowerCase() ||
          type === constants.number.toLowerCase()
        ) {
          return Yup.string()
            .required("This field is required !")
            .min(
              validations?.min,
              `Must be greater than ${validations?.min} letters`
            )
            .max(
              validations?.max,
              `Must be less than ${validations?.max} letters`
            );
        } else return Yup.string().required("This field is required !");
      } else
        return Yup.number()
          .min(validations?.min, `Must be greater than ${validations?.min}`)
          .max(validations?.max, `Must be less than ${validations?.max}`);
      break;
    //Radio validation
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
          .required("Select at least one option.")
          .min(1, "At least one option be select")
          .of(
            Yup.object().shape({
              label: Yup.string().required("Select at least one option."),
              value: Yup.string().required("Select at least one option."),
            })
          );
      } else {
        return Yup.array();
      }

    //Checkbox
    case constants.checkbox.toLowerCase():
      if (validations?.isRequired) {
        return Yup.array()
          .required("Please select an option")
          .of(
            Yup.object({
              option: Yup.string().required(),
              checked: Yup.boolean(),
            })
          )
          .min(1, "At least one option be select")
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
        return Yup.date()
          .required("Date is required")

          .transform((curr, orig) => (orig === "" ? null : curr));
      } else
        return Yup.date()
          .nullable()
          .transform((curr, orig) => (orig === "" ? null : curr));
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
