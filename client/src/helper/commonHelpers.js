export const getError = (error, customMessage = "") => {
  if (error?.message) {
    console.log(error.message);
    return error.message;
  }
  return customMessage;
};

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const ShortHandText = (text, length) => {
  return text && text.length > length ? text.slice(0, length) + "..." : text;
};
export const deleteEntry = (id, data) => {
  return data.filter((entry) => entry.id !== id);
};
export function get_file_extension(url) {
  if (url) {
    if (url.includes("/shorts/")) {
      return "com/shorts";
    }
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  return false;
}
export function getCard() {
  const card = [];
  const row = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      row.push(0);
    }
    card.push(row);
  }
  return card;
}
export const isUrlOrFilePath = (string) => {
  const urlPattern = /^https?:\/\/.*/;
  const filepathPattern = /^\//;
  if (urlPattern.test(string)) {
    return "URL";
  } else if (filepathPattern.test(string)) {
    return "File path";
  } else {
    return "Unknown";
  }
};
export function haveSameValues(arr1, arr2, option) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const key = arr1[i];
    const key2 = arr2[i];
    if (key.title !== key2.title || key.image !== key2.image) {
      return false;
    }
    if (option) {
      if (key !== key2) {
        return false;
      }
    }
  }

  return true;
}
export function swapArrayIndex(arr, oldIndex, newIndex) {
  const length = arr.length;
  const itemToMove = arr[oldIndex];

  if (oldIndex === newIndex || oldIndex > length || newIndex > length) {
    return arr;
  }

  return arr.reduce((acc, item, index) => {
    if (index === oldIndex) return acc;
    if (index === newIndex)
      return oldIndex < newIndex
        ? [...acc, item, itemToMove]
        : [...acc, itemToMove, item];
    return [...acc, item];
  }, []);
}

export function compareArrays(array1, array2) {
  const uniqueTo1 = array1.filter((obj1) => {
    return array2.some(
      (obj2) => obj1.categoryName.toUpperCase() === obj2.label.toUpperCase()
    );
  });
  const uniqueTo2 = array2.filter((obj2) => {
    return array1.some(
      (obj1) => obj2.label.toUpperCase() !== obj1.categoryName.toUpperCase()
    );
  });
  // console.log(uniqueTo1, uniqueTo2);
  const result = uniqueTo1.concat(uniqueTo2);
  return uniqueTo1;
}
export const compare = (array1, array2) => {
  return array1.filter(
    (i) => !array2.some((o) => i.title === o.title && i.image === o.image)
  );
};
export function checkUrlContentType(url) {
  const urlRegex = /\.(wav|mp4|mp3|midi|jpeg|jpg|png|gif)(\?.*)?$/i;
  if (urlRegex.test(url)) {
    const extension = url.match(urlRegex)[1].toLowerCase();
    switch (extension) {
      case "wav":
        return "wav";
      case "mp4":
        return "mp4";
      case "mp3":
        return "mp3";
      case "midi":
        return "midi";
      case "jpeg":
        return "jpeg";
      case "jpg":
        return "jpg";
      case "png":
        return "png";
      case "gif":
        return "gif";
      default:
        return "unknown";
    }
  } else {
    get_file_extension(url);
  }
}
export const validateEmail = (
  text,
  errorMessage = "this is a required field"
) => {
  if (text.trim().length === 0) {
    return errorMessage;
  }

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text) ? "" : "please enter valid email";
};
export const validateOtp = (text) => {
  let reg = /^\d{6}$/;
  return reg.test(text) ? "" : "please enter 6 digit valid otp";
};
export const validatePassword = (
  text,
  errorMessage = "This is a required field"
) => {
  if (text.trim().length === 0) {
    return errorMessage;
  }
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
  return reg.test(text)
    ? ""
    : "Password Must contain at least one number and one uppercase and lowercase letter";
};
export const validateConfirmPassword = (
  password1,
  password2,
  errorMessage = "Password does not match"
) => {
  if (password2.trim().length === 0) {
    return "This is a required field";
  }
  if (password1 === password2) {
    return "";
  }
  return errorMessage;
};
export const validateTotalPlayers = (players) => {
  let reg = /^(?:[1-9]|[1-4][0-9]|50)$/;
  return reg.test(players)
    ? ""
    : "Total no of question must be between 1 to 50";
};
export const checkForEmpty = (text, title, length) => {
  if (title) {
    if (text.trim().length === 0) {
      return `${title} is a required field`;
    }
    if (text.trim().length < length) {
      return `${title} must be atleast ${length} characters`;
    }
  } else {
    if (text.trim().length === 0) {
      return "This is a required field";
    }
    if (text.trim().length < 3) {
      return "Name must be atleast 3 characters";
    }
  }
};
export const validateQuizName = (text) => {
  let validateReg = /^[A-Za-z\s]+$/;
  let lengthReg = /^.{3,30}$/;
  if (text.trim().length === 0) {
    return "this is a required field";
  }
  if (!lengthReg.test(text)) {
    return "quizname must be 3 to 30 characters long";
  }
  if (!validateReg.test(text)) {
    return "quizname must contain only alphanumeric characters";
  }
};
export const validateName = (text) => {
  let validateReg = /^[a-zA-Z\s]+$/;
  let lengthReg = /^.{3,30}$/;
  if (text.trim().length === 0) {
    return "this is a required field";
  }
  if (!lengthReg.test(text)) {
    return "name must be 3 to 30 characters long";
  }
  if (!validateReg.test(text)) {
    return "name must contain only alphanumeric characters";
  }
};
export const validateRating = (text) => {
  if (String(text).trim().length === 0) {
    return "Please add rating";
  }
};
export const unsecuredCopyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
};
export const mergeArrays = (firstArray, secondArray) => {
  const claimTypeMap = new Map();
  firstArray?.forEach((item) => {
    claimTypeMap?.set(item.claimType, item);
  });

  const mergedArray = secondArray?.map((item) => {
    const claimTypeItem = claimTypeMap?.get(item.key);
    return { ...item, ...claimTypeItem };
  });

  return mergedArray;
};
