import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY);
    req.user = verified; // inject the payload
    return next();
  } catch (error) {
    res.status(401).json({ error: "invalid or expired token." });
  }
};
