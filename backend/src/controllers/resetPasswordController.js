import { jwtDecode } from "jwt-decode";
import bcrypt from "bcrypt";
import { fetchAccounts } from "../services/fetchAccounts.js";
import { ref, update, set } from "firebase/database";
import { db } from "../firebase.js";
import { isPasswordValid } from "../services/verifyCredentialsUtils.js";

export const resetPasswordController = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json("Missing or invalid token.");
  }

  const token = authHeader.split(" ")[1];

  const payload = jwtDecode(token);

  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res
      .status(500)
      .json({ error: "Missing employee username and/or new password." });
  }
  if (!isPasswordValid(newPassword)) {
    return res.status(401).json({ error: "invalid password format." });
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    const accounts = await fetchAccounts();

    if (!accounts) {
      return res.status(500).json({ error: "Unable to update password." });
    }

    const userAccount = accounts.find(
      (account) => account.username === username,
    );

    const accountRef = ref(db, `accounts/${userAccount.id}`);

    try {
      await update(accountRef, {
        hashedPassword: newHashedPassword,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    return res.status(500).json({ error: "Unable to update password." });
  }
};
