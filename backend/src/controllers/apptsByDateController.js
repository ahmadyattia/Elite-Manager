import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { db } from "../firebase.js";

export const apptsByDateController = async (req, res) => {
  const dateCheckRegex = /^\d{4}-\d{2}-\d{2}$/;

  const { date } = req.body;

  if (!date || !dateCheckRegex.test(date)) {
    return res.status(400).json({
      error: "invalid date. Date is probably undefined or in a wrong format.",
    });
  }

  try {
    const appointmentsRef = ref(db, "appointments");

    const q = query(appointmentsRef, orderByChild("date"), equalTo(date));

    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return res
        .status(200)
        .json({
          appointments: null,
          success: true,
          message: "The database returned empty data.",
        });
    }
    return res
      .status(200)
      .json({ appointments: snapshot.val(), success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
