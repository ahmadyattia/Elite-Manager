import { db } from "../firebase.js";
import { ref, push, set } from "firebase/database";

export const saveAccount = async (username, hashedPassword, isAdmin) => {
  const accountRef = ref(db, "accounts"); // reference the db object

  const newAccountRef = push(accountRef); // Generate a new matching unique push key

  const hashedCredentials = { username, hashedPassword, isAdmin };
  try {
    await set(newAccountRef, hashedCredentials);
  } catch (error) {
    throw error;
  }
};
