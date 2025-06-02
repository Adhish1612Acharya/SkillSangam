import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import Application from "../models/Application/Application.js";
const router = express.Router();

// CREATE an application
router.post("/:schemeid/apply", wrapAsync(async (req, res) => {
  const { schemeid } = req.params;
  const { details } = req.body; // expecting an array of { feild, feildType }

  if (!req.user || req.user.role !== "family") {
    throw new ExpressError("Only family members can apply", 403);
  }

  const newApplication = new Application({
    owner: req.user._id,
    schemes: schemeid,
    details,
  });

  await newApplication.save();
  res.status(201).json({ message: "Application submitted", application: newApplication });
}));

// GET application status
router.get("/:id", wrapAsync(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate("owner")
    .populate("schemes");

  if (!application) throw new ExpressError("Application not found", 404);

  res.json(application);
}));
