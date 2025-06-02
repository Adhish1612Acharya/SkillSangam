import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middlewares/authmiddlewares.js";
import { addFamily } from "../controllers/personnel.js";

const router = express.Router();

// PUT /addfamily
router.put("/addfamily", isLoggedIn, wrapAsync(addFamily));

export default router;
