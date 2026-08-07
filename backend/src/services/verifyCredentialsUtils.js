import { boolean } from "mathjs";

export const verifySignupCredentials = (req, res, next) => {
  let isValidFName = false;
  let isValidLName = false;
  let isValidUsername = false;
  let isValidPassword = false;
  let isValidAdminInput = false;

  let responseData = {};

  const { fName, lName, username, password, isAdmin } = req.body;

  if (!fName.trim()) {
    isValidFName = false;
    responseData.fNameError = "Please enter a first name";
  } else {
    isValidFName = true;
  }

  if (!lName.trim()) {
    isValidLName = false;
    responseData.lNameError = "Please enter a last name";
  } else {
    isValidLName = true;
  }

  if (username.length < 10 || username.length > 30 || !username.trim()) {
    isValidUsername = false;
    responseData.usernameError =
      "Username must be between 10 and 30 characters";
  } else {
    isValidUsername = true;
  }

  const includesSpecialCharacters = password.includes();

  if (
    password.length < 8 ||
    !hasSpecialCharacters(password) ||
    !hasLettersAndNumbers(password)
  ) {
    isValidPassword = false;
    responseData.passwordError =
      "Password must have 8 or more characters and have at least one character and one digit.";
  } else {
    isValidPassword = true;
  }

  if (typeof isAdmin !== "boolean") {
    isValidAdminInput = false;
    responseData.isAdminError = "Admin input must be a boolean.";
  } else {
    isValidAdminInput = true;
  }

  if (
    !isValidFName ||
    !isValidLName ||
    !isValidUsername ||
    !isValidPassword ||
    !isValidAdminInput
  ) {
    return res.status(400).json(responseData);
  } else {
    return next();
  }
};

export const verifyLoginCredentials = (req, res, next) => {
  let isValidUsername = false;
  let isValidPassword = false;

  let responseData = {};

  const { username, password } = req.body;

  if (username.length < 10 || username.length > 30 || !username.trim()) {
    isValidUsername = false;
    responseData.usernameError =
      "Username must be between 10 and 30 characters";
  } else {
    isValidUsername = true;
  }

  const includesSpecialCharacters = password.includes();

  if (
    password.length < 8 ||
    !hasSpecialCharacters(password) ||
    !hasLettersAndNumbers(password)
  ) {
    isValidPassword = false;
    responseData.passwordError =
      "Password must have 8 or more characters and have at least one character and one digit.";
  } else {
    isValidPassword = true;
  }

  if (!isValidUsername || !isValidPassword) {
    return res.status(400).json(responseData);
  } else {
    return next();
  }
};

function hasSpecialCharacters(password) {
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(password);
}

function hasLettersAndNumbers(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
}
