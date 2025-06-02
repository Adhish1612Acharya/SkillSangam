import express from "express";
import Scheme from "../models/Schemes/Schemes.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import Application from "../models/Application.js";
import { familyMiddleware } from "../middlewares/adminMiddlewares.js";
import Officer from "../models/Officer.js";

const router = express.Router();

// Create a new scheme
router.post("/", wrapAsync(async (req, res) => {
  const scheme = new Scheme(req.body);
  const saved = await scheme.save();
  res.status(201).json(saved); // respond with the saved scheme
}));

// Get all schemes and application status counts
router.get("/", wrapAsync(async (req, res) => {
  const schemes = await Scheme.find()
    .populate("owner")
    .populate("application");

  // Count applications based on status
  const processingCount = await Application.countDocuments({ "status.process": true });
  const acceptedCount = await Application.countDocuments({ "status.accepted": true });
  const rejectedCount = await Application.countDocuments({
    "status.process": false,
    "status.accepted": false
  });

  res.json({
    schemes,
    processing: processingCount,
    accepted: acceptedCount,
    rejected: rejectedCount
  });
}));

// Get one scheme by ID
router.get("/:id", wrapAsync(async (req, res, next) => {
  const scheme = await Scheme.findById(req.params.id)
    .populate("owner")
    .populate("application");
  if (!scheme) throw new ExpressError("Scheme not found", 404);
  res.json(scheme);
}));

// Update a scheme by ID
router.put("/:id", wrapAsync(async (req, res, next) => {
  const updated = await Scheme.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) throw new ExpressError("Scheme not found", 404);
  res.json(updated); // return updated scheme
}));

// Delete a scheme by ID
router.delete("/:id", wrapAsync(async (req, res, next) => {
  const deleted = await Scheme.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ExpressError("Scheme not found", 404);
  res.json({ message: "Scheme deleted successfully" });
}));

export default router;
