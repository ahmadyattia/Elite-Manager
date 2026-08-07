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
      accounts.find((account) => account.username === username).hashedPassword,
    );

    if (!validPassword) {
      return res.status(400).json({ passwordError: "invalid password." });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const payload = {
      username,
      isAdmin: validAccount.isAdmin,
    };

    const sessionDuration = "15m";

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: sessionDuration,
    });
    const loggedInToken = jwt.sign({ logged_in: true }, JWT_SECRET_KEY, {
      expiresIn: sessionDuration,
    });

    // Check if the current environment is production
    const isProduction = process.env.NODE_ENV === "production";

    console.log(isProduction);
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true means only passes over HTTPS (turn off for local development)
      maxAge: 60 * 15 * 1000,
      sameSite: isProduction ? "none" : "lax",
    });

    res.cookie("logged_in", loggedInToken, {
      httpOnly: false,
      secure: isProduction,
      maxAge: 60 * 15 * 1000,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "logged in successfully!",
      isAdmin: validAccount.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
