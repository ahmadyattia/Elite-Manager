import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const apiKeyHeader = req.headers["api-key"];

  if (apiKeyHeader === process.env.API_KEY) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; // inject the payload
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid api key or expired token." });
  }
};
