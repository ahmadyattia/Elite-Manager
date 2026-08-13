import fetchAppts from "../services/fetchAppts.js";
import { get, ref } from "firebase/database";
import { db } from "../firebase.js";

export default async function apptsController(req, res) {
  try {
    const appts = await fetchAppts();

    res.json(appts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
