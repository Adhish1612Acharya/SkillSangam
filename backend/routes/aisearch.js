import express from "express";
import axios from "axios";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import Scheme from "../models/Scheme.js";

const router = express.Router();

router.get("/aisearchquery", wrapAsync(async (req, res) => {
    const { search } = req.query;
    if (!search) {
        throw new ExpressError("Search query missing", 400);
    }

    // Get all schemes
    const allSchemes = await Scheme.find();

    if (!allSchemes.length) {
        // No schemes found in DB
        return res.status(404).json({ 
            success: false,
            message: "No schemes found in the database."
        });
    }

    const schemes = allSchemes.map(s => ({
        title: s.title,
        description: s.description,
        scheme_id: s._id.toString()
    }));

    // Prepare payload
    const modelInput = {
        query: search,
        schemes: schemes
    };

    try {
        const response = await axios.post(
            "https://pranavpai0309-ai-post-filtering-sangam.hf.space/recommend",
            modelInput
        );

        return res.status(200).json({
            success: true,
            message: "Schemes filtered successfully.",
            data: response.data
        });
    } catch (err) {
        console.error("Error calling AI model:", err.message);
        throw new ExpressError("Failed to get response from AI model", 500);
    }
}));

export default router;
