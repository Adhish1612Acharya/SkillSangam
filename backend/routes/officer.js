import express from "express";
import passport from "passport";
import { login, failureLogin, logout } from "../controllers/officer.js";

const router = express.Router();

// Officer Login
router.post(
  "/login",
  passport.authenticate("officer", {
    failureRedirect: "/api/auth/officer/failureLogin",
  }),
  login
);

// Officer Failure Login
router.get("/failureLogin", failureLogin);

// Officer Logout
router.post("/logout", logout);

export default router;
