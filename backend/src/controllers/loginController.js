import { fetchAccounts } from "../services/fetchAccounts.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const accounts = await fetchAccounts();

    const validAccount =
      accounts && accounts.find((account) => account.username === username);

    if (!validAccount) {
      return res.status(400).json({ usernameError: "Invalid username." });
    }

    const validPassword = await bcrypt.compare(
      password,
      validAccount.hashedPassword,
    );

    if (!validPassword) {
      return res.status(400).json({ passwordError: "invalid password." });
    }

    const payload = {
      username,
      password: validAccount.hashedPassword,
      isAdmin: validAccount.isAdmin,
    };

    res.status(200);

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    res.json({
      success: true,
      message: "logged in successfully!",
      isAdmin: validAccount.isAdmin,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
