import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { saveAccount } from "../services/saveAccount.js";
import { fetchAccounts } from "../services/fetchAccounts.js";

export const signupController = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(403).json({ error: "Missing or expired token." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const isVerifiedAdmin = payload.isAdmin;

    if (!isVerifiedAdmin) {
      return res.status(403).json({ error: "Must be an admin to sign up." });
    }

    const existingAccounts = await fetchAccounts();

    const userExists =
      existingAccounts &&
      existingAccounts.find((account) => account.username === username);

    if (userExists) {
      return res.status(400).json({ error: "user already exists" });
    }

    await saveAccount(username, hashedPassword, isAdmin);

    res.json({ success: true, message: "signed up successfully!" });
  } catch (error) {
    res.json({ error: error.message });
  }
};
