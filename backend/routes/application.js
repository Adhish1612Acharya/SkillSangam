import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import Application from "../models/Application/Application.js";
import Scheme from "../models/Schemes/Schemes.js"; // Import Scheme model
import { familyMiddleware } from "../middlewares/adminMiddlewares.js"; // Middleware to get req.user
import Family from "../models/Family.js"; // (if needed later)

const router = express.Router();

/**
 * Apply to a specific scheme
 * Validates that all required fields are filled before submitting
 */
router.post("/apply/:id", familyMiddleware, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const scheme = await Scheme.findById(id);
  if (!scheme) throw new ExpressError("Scheme not found", 404);

  const userDetails = req.body.details;

  // Compare required fields with user-provided fields
  const requiredFields = scheme.details.map(detail => detail.feild).sort();
  const providedFields = userDetails.map(detail => detail.feild).sort();
  const fieldsMatch = JSON.stringify(requiredFields) === JSON.stringify(providedFields);

  if (!fieldsMatch) {
    throw new ExpressError("Application details do not match the scheme requirements", 400);
  }

  // Save valid application
  const application = new Application({
    ...req.body,
    owner: req.user,
    scheme: scheme._id
  });

  await application.save();

  res.status(201).json({
    message: "Application submitted successfully",
    application
  });
}));

/**
 * Mark application as rejected (status only)
 * Doesn't set reason, only updates status
 */
router.get("/:id/reject", wrapAsync(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate("owner")
    .populate("scheme");

  if (!application) throw new ExpressError("Application not found", 404);

  application.status = { process: false, accepted: false };
  await application.save();

  res.json({
    message: "Application marked as rejected (view-only)",
    application
  });
}));

/**
 * Post a rejection reason for an application
 */
router.post("/:id/accept", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { rejectReason } = req.body;

  const application = await Application.findById(id);
  if (!application) throw new ExpressError("Application not found", 404);

  application.rejectReason = rejectReason || "No reason provided";
  application.status = { process: false, accepted: true };
  await application.save();

  res.json({
    message: "Application rejected with reason",
    application
  });
}));

/**
 * Approve an application
 */
router.get("/:id/approve", wrapAsync(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate("Owner")  // Make sure this matches your model reference name (should likely be "owner")
    .populate("Scheme"); // Same here (should be "scheme")

  if (!application) throw new ExpressError("Application not found", 404);

  application.status = { process: false, accepted: true };
  await application.save();

  res.json({
    message: "Application approved successfully",
    application
  });
}));

/**
 * Get all users who have the same accepted status as the current user
 */
router.get("/similarusers", wrapAsync(async (req, res) => {
  const ownerId = req.user._id;

  // Get the current user's application
  const currentApplication = await Application.findOne({ owner: ownerId });
  if (!currentApplication) {
    return res.status(404).json({ message: "Application not found for current user" });
  }

  const currentStatus = currentApplication.status.accepted;

  // Get all users with the same accepted status, excluding current user
  const similarUsers = await Application.find({ 
    "status.accepted": currentStatus,
    owner: { $ne: ownerId }
  }).populate("owner");

  res.json({
    message: `Users with accepted status = ${currentStatus}`,
    similarUsers
  });
}));

export default router;
