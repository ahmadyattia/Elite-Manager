import { get, ref } from "firebase/database";
import { db } from "../firebase.js";

const fetchAppts = async () => {
  const appointmentsRef = ref(db, "appointments");

  try {
    const dataSnapshot = await get(appointmentsRef);

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

export default fetchAppts;
