import Admin from "../models/Admin.js";

// Admin authentication controller
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

export const signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username and password are required",
        });
    }
  
    const newAdmin = new Admin({ username });
    Admin.register(newAdmin, password, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        return res
          .status(200)
          .json({ success: true, message: "Admin registered successfully" });
      });
    });
  } catch (err) {
    next(err);
  }
};
