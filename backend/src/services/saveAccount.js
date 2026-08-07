import { db } from "../firebase.js";
import { ref, push, set } from "firebase/database";

export const saveAccount = async (
  fName,
  lName,
  username,
  hashedPassword,
  isAdmin,
) => {
  const accountRef = ref(db, "accounts"); // reference the db object

  const newAccountRef = push(accountRef); // Generate a new matching unique push key

  fName = fName.charAt(0).toUpperCase() + fName.slice(1);
  lName = lName.charAt(0).toUpperCase() + lName.slice(1);

  const hashedCredentials = { fName, lName, username, hashedPassword, isAdmin };
  try {
    await set(newAccountRef, hashedCredentials);
  } catch (error) {
    throw error;
  }
};
