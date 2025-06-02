// Family authentication controller
import passport from "passport";
import Family from "../models/Family.js";
import Personnel from "../models/Personnel.js";
import ExpressError from "../utils/expressError.js";

export const signup = async (req, res) => {
  const { fullName, adhaarNumber, familyCode, password, email, username } =
    req.body;
  // 1. Verify Personnel
  const personnel = await Personnel.findOne({
    "familyHead.fullName": fullName,
    "familyHead.adhaarNumber": adhaarNumber,
    familyCode: familyCode,
  });
  if (!personnel) {
    throw new ExpressError(
      400,
      "Family details not found or do not match our records."
    );
  }
  // 2. Register Family
  let signUpError = false;
  let error = "";
  const newFamily = new Family({
    username,
    email,
    familyCode,
    familyHead: { fullName, adhaarNumber },
  });
  const registeredFamily = await Family.register(newFamily, password).catch(
    (err) => {
      signUpError = true;
      error = err.message;
    }
  );
  if (!signUpError && registeredFamily) {
    req.login(registeredFamily, (err) => {
      if (err) {
        throw new ExpressError(500, err.message);
      } else {
        return res
          .status(200)
          .json({ success: true, message: "successSignUp" });
      }
    });
  } else {
    throw new ExpressError(400, error);
  }
};

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
