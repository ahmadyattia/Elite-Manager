import { get, ref } from "firebase/database";
import { db } from "../firebase.js";

export const fetchAccounts = async () => {
  const accountsRef = ref(db, "accounts");

  try {
    const dataSnapshot = await get(accountsRef);

    if (dataSnapshot.exists()) {
      const data = dataSnapshot.val();
      return Object.entries(data).map(([key, value]) => ({
        ...value,
      }));
    }
  } catch (error) {
    throw error;
  }
};
