import { customAlphabet } from "nanoid";
import Personnel from "../models/Personnel.js";
import ExpressError from "../utils/expressError.js";
import passport from "passport";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateFamilyCode = customAlphabet(alphabet, 6);

export const addFamily = async (req, res) => {
  const { fullName, adhaarNumber } = req.body;

  // Step 1: Validate input
  if (!fullName || !adhaarNumber) {
    throw new ExpressError("Full name and Aadhaar number are required", 400);
  }

  // Step 2: Check if user is logged in
  const personnelId = req.user._id;
  if (!personnelId) {
    throw new ExpressError("Unauthorized", 401);
  }

  // Step 3: Generate familyCode
  const familyCode = generateFamilyCode();

  // Step 4: Save to database
  const updatedPersonnel = await Personnel.findByIdAndUpdate(
    personnelId,
    {
      familyHead: { fullName, adhaarNumber },
      familyCode,
    },
    { new: true, runValidators: true }
  );

  if (!updatedPersonnel) {
    throw new ExpressError("Personnel not found", 404);
  }

  // Step 5: Send familyCode back to frontend
  res.status(200).json({
    message: "Family details saved successfully",
    familyCode: updatedPersonnel.familyCode,
  });
};

export const signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    serviceNumber,
    rank,
    unitOrRegiment,
    joinDate,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !serviceNumber ||
    !rank ||
    !unitOrRegiment ||
    !joinDate
  ) {
    throw new ExpressError("All fields are required", 400);
  }
  if (password !== confirmPassword) {
    throw new ExpressError("Passwords do not match", 400);
  }

  const username = email; // Use email as username for login

  const newPersonnel = new Personnel({
    username,
    email,

    profile: {
      fullName,
      joinDate,
      post: rank,
      serviceNumber,
      rank,
      unitOrRegiment,
    },
  });

  let signUpError = false;
  let error = "";
  const registeredPersonnel = await Personnel.register(
    newPersonnel,
    password
  ).catch((err) => {
    signUpError = true;
    error = err.message;
  });
  if (!signUpError && registeredPersonnel) {
    req.login(registeredPersonnel, (err) => {
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
