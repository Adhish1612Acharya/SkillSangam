import express from "express";
import passport from "passport";
import { login, failureLogin, logout } from "../controllers/admin.js";

const router = express.Router();

// Admin Login
router.post(
  "/login",
  passport.authenticate("admin", {
    failureRedirect: "/api/auth/admin/failureLogin",
  }),
  login
);

// Admin Failure Login
router.get("/failureLogin", failureLogin);

// Admin Logout
router.post("/logout", logout);

export default router;
