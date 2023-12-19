import constants from "./constantKeyword/constants";

export const validationDetails = [
    {
      elementType: constants.email.toLowerCase(),
    },
    {
      elementType: constants.phone.toLowerCase(),
    },
    {
      elementType: constants.pincode.toLowerCase(),
    },
    {
      elementType: constants.onlyAlphabets.toLowerCase(),
    },
    {
      elementType: constants.onlyAlphanumeric.toLowerCase(),
    },
    {
      elementType: constants.specialCharacterAllowed.toLowerCase(),
    }
  ];
  
  export const numberValidation =[
    {
      elementType: constants.onlyIntegerNumber
    },
    {
      elementType: constants.allowDecimal
    }
  ]

export const getValidationList =(fieldType) => {
    if(fieldType === constants.text) return validationDetails;
    if(fieldType === constants.number) return numberValidation
}