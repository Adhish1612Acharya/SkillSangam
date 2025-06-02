import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import { customAlphabet } from 'nanoid';
import Personnel from "../models/Personnel.js";
import {isLoggedIn} from "../middlewares/authmiddlewares.js"
const router = express.Router();

// NanoID setup for 6-character code
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const generateFamilyCode = customAlphabet(alphabet, 6);

// PUT /addfamily
router.put("/addfamily",isLoggedIn, wrapAsync(async (req, res, next) => {
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
}));

export default router;
