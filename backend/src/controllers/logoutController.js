export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("logged_in");
  return res.json({ success: true, message: "logged out successfully." });
};
