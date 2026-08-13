import { db } from "../firebase.js";
import { ref, push, set } from "firebase/database";

export default async function addAppointment(appt) {
  try {
    const appointmentRef = ref(db, "appointments"); // reference the db object

    const newAppointmentRef = push(appointmentRef); // Generate a new matching unique push key

    await set(newAppointmentRef, appt);
  } catch (error) {
    throw error;
  }
}
