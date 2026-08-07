import { fetchAccounts } from "../services/fetchAccounts.js";

export const employeesController = async (req, res) => {
  try {
    const accounts = await fetchAccounts();

    res.json({ success: true, accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
