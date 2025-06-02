import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import { signup, login, failureLogin, logout } from "../controllers/family.js";
import { validateBody } from "../middlewares/validation/validationMiddleware.js";
import {
  familySignupSchema,
  familyLoginSchema,
} from "../middlewares/validation/validationSchema.js";

const router = express.Router();

// Family Sign Up
router.post("/signup", validateBody(familySignupSchema), wrapAsync(signup));

// Family Login
router.post(
  "/login",
  validateBody(familyLoginSchema),
  passport.authenticate("family", {
    failureRedirect: "/api/auth/family/failureLogin",
  }),
  login
);

// Family Failure Login
router.get("/failureLogin", failureLogin);

// Family Logout
router.post("/logout", logout);

export default router;
