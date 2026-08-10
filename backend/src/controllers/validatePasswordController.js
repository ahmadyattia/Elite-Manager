import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const validatePasswordController = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json("Missing or invalid token.");
  }

  const { currentUserPassword } = req.body;

  const token = authHeader.split(" ")[1];

  const payload = jwtDecode(token);

  try {
    const isValidPassword = await bcrypt.compare(
      currentUserPassword,
      payload.password,
    );

    if (isValidPassword) {
      res.status(200).json({ success: true, message: "Password is valid!" });
    } else {
      res.status(403).json({ error: "invalid password." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to validate password." });
  }
};
