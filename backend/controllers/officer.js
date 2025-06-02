// Officer authentication controller
export const login = (req, res) => {
  res.status(200).json({ success: true, message: "Login successful" });
};

export const failureLogin = (req, res) => {
  res
    .status(401)
    .json({ success: false, message: "Invalid credentials or login failed" });
};

export const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};
