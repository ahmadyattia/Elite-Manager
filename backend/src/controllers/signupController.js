import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { saveAccount } from "../services/saveAccount.js";
import { fetchAccounts } from "../services/fetchAccounts.js";

export const signupController = async (req, res) => {
  const { fName, lName, username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // if (!token) {
    //   return res.status(403).json({ error: "Missing or expired token." });
    // }

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
      return res.status(400).json({ error: "username already exists" });
    }

    await saveAccount(fName, lName, username, hashedPassword, isAdmin);

    res.json({ success: true, message: "signed up successfully!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
