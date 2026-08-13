import addAppointment from "../services/addAppointment.js";

export const postApptController = async (req, res) => {
  const { appointment } = req.body;

  if (!appointment) {
    return res
      .status(400)
      .json({ error: "invalid or missing appointment entry." });
  }

  try {
    await addAppointment(appointment);

    res
      .status(200)
      .json({ success: true, message: "appointment booked successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error. Please contact us directly." });
  }
};
