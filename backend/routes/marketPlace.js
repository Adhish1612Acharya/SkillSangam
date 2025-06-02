import express from "express";
import Listing from "../models/marketPlaceListing.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import multer from "multer";
import { storage } from "../cloudConfig.js"; // Multer + Cloudinary config
import { v2 as cloudinary } from "cloudinary"; // Needed for deletion

const router = express.Router();
const upload = multer({ storage });

// CREATE a listing
router.post(
  "/",
  upload.array("images", 5),
  wrapAsync(async (req, res) => {
    const listingData = req.body;

    if (!req.files || req.files.length === 0) {
      throw new ExpressError("At least one image is required", 400);
    }

    listingData.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename,
    }));

    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({
      message: "Listing created successfully",
      listing: newListing,
    });
  })
);

// READ all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.json({ listings });
  })
);

// READ one listing by ID
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError("Listing not found", 404);

    res.json({ listing });
  })
);

// UPDATE a listing
router.put(
  "/:id",
  upload.array("images", 5),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError("Listing not found", 404);

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.path,
        filename: file.filename,
      }));
      listing.images.push(...newImages);
    }

    Object.assign(listing, updates); // merge updated fields
    await listing.save();

    res.json({
      message: "Listing updated successfully",
      listing,
    });
  })
);

// DELETE a listing and its images from Cloudinary
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) throw new ExpressError("Listing not found", 404);

    // Delete images from Cloudinary
    for (let img of listing.images) {
      await cloudinary.uploader.destroy(img.filename);
    }

    await listing.deleteOne();

    res.json({ message: "Listing and images deleted successfully" });
  })
);

export default router;
