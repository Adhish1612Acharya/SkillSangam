import express from "express";
import Scheme from "../models/Schema/Schemes.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";

const router = express.Router();

// Create a new scheme
router.post("/", wrapAsync(async (req, res) => {
  const scheme = new Scheme(req.body);

  /* 
  schema.owner=req.user;
  */
  const saved = await scheme.save();
  res.status(201).json(saved);
}));

// Get all schemes
router.get("/", wrapAsync(async (req, res) => {
  const schemes = await Scheme.find().populate("owner").populate("application");
  res.json(schemes);
}));

// Get one scheme
router.get("/:id", wrapAsync(async (req, res, next) => {
  const scheme = await Scheme.findById(req.params.id).populate("owner").populate("application");
  if (!scheme) throw new ExpressError("Scheme not found", 404);
  res.json(scheme);
}));

// Update scheme
router.put("/:id", wrapAsync(async (req, res, next) => {
  const updated = await Scheme.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) throw new ExpressError("Scheme not found", 404);
  res.json(updated);
}));

// Delete scheme
router.delete("/:id", wrapAsync(async (req, res, next) => {
  const deleted = await Scheme.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ExpressError("Scheme not found", 404);
  res.json({ message: "Scheme deleted successfully" });
}));

export default router;
